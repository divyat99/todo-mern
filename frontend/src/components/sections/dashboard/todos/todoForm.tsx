import React, { useState,useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import config from 'config';
import { toastifySuccess, toastifyError, getAllLocatData } from "Utility/Utility"; // Ensure these functions exist

const TodoForm = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('');
  const [userId, setUserId] = useState(''); 
 
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const localData = getAllLocatData(); // Retrieve and decrypt token
    const token = localData?.token;
    console.log(localData,'local')
    const id=localData?.login_id;

    console.log(id,'idd')
    if (!token) {
      toastifyError('No token found');
      return;
    }
 //Check if userId is available
 if (!id) {
  toastifyError('User ID is missing');
  return;
}

    try {
      const response = await axios.post(
        `${config.url}/create/todo`,
        { task, priority, id },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        }
      );

      toastifySuccess('Task added successfully');
      console.log(response.data);
      // Clear form
      setTask('');
      setPriority('');
      setUserId('');
    } catch (error) {
      toastifyError('Error adding task');
      console.error('Error adding task:', error.response?.data || error.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', // Align items to the left
        width: '100%',
        maxWidth: 600, // Adjusted width
        padding: 2, // Added padding for better spacing
        backgroundColor: 'background.paper',
        borderRadius: 1,
        boxShadow: 3,
      }}
    >
      <h2>Add To-Do Item</h2>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Task"
            variant="outlined"
            fullWidth
            margin="normal"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
            sx={{ flexGrow: 1, marginRight: 2 }} // Make TextField flexible and add margin to the right
          />
          <Button
            type="submit"
            variant="contained"
            color="warning"
            sx={{ marginTop: 2 }}
          >
            Add 
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TodoForm;
