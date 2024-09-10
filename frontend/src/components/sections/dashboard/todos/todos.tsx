import { useState, ChangeEvent, useCallback, ReactElement, useEffect } from 'react';
import { Box, Paper, Stack, TextField, Typography, InputAdornment } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import axios from 'axios';
import TodoTable from './todoTable';
import config from 'config';
import { getAllLocatData, toastifyError, toastifySuccess } from 'Utility/Utility';
import { useTasks } from 'context/TaskContext';
import TodoForm from './todoForm';
import UserDropdown from 'layouts/main-layout/Topbar/UserDropdown';
const Todos = (): ReactElement => {
  const [search, setSearch] = useState<string>('');
  const { tasks, setTasks } = useTasks();

  //const [tasks, setTasks] = useState([]);
  const [refreshTasks, setRefreshTasks] = useState<boolean>(false); // New state for triggering refresh

  const localData = getAllLocatData();

  console.log(localData, 'localdata');
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  }, []);

  useEffect(() => {
    fetchTasks();
    //  console.log(tasks,'tasks')
  }, [refreshTasks]);
  
  const fetchTasks = async () => {
    const token = localData?.token;
    if (!token) {
      toastifyError('No token found');
      return;
    }

    try {
      console.log('Attempting to fetch tasks from', `${config.url}/alltodo`);
      const uri = `${config.url}/alltodo`;
      // console.log({uri})
      const response = await axios.get(String(uri), {
        headers: {
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpdnlhQGdtYWlsLmNvbSIsImlkIjoiNjZhNzcyMjNkZWQ4ODY2ZDMyOGZmNzRlIiwiaWF0IjoxNzIyMjUwODcyfQ.avDgWl2iNl3iSvh4aPKawLvlXkTxPY8l-JTfgB2GEjQ`,
          Authorization: `Bearer ${token}`,

          'Content-Type': 'application/json',
        },
      });
      console.log('Successfully fetched tasks:', response.data);
      setTasks(response?.data?.data);
    } catch (error) {
      if (error.response) {
        // The server responded with a status other than 2xx
        // console.error('Error fetching tasks - Server Response:', error.response.data);
        // console.error('Status Code:', error.response.status);
        // console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error fetching tasks - No Response Received:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error fetching tasks - Request Setup Error:', error.message);
      }
    }
  };


  const deleteTask = async (id: string) => {
    const token = localData?.token;

    if (!token) {
      toastifyError('No token found');
      return;
    }

    try {
      await axios.delete(`${config.url}/deletetodo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toastifySuccess('Task deleted successfully');
      setRefreshTasks(!refreshTasks);
    } catch (error) {
      toastifyError('Error deleting task');
      console.error('Error deleting task:', error);
    }
  };
  const updateTask = async (
    id: string,
    updatedTask: string,
    statusBoolean: boolean,
   
  ) => {
    console.log('Update Parameters:', id, updatedTask, statusBoolean);
  
    const token = localData?.token;
  
    if (!token) {
      toastifyError('No token found');
      return;
    }
  
    try {
      await axios.put(
        `${config.url}/updatetodo/${id}`,
        { _id: id, task: updatedTask, status: statusBoolean},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      toastifySuccess('Task updated successfully');
      setRefreshTasks(!refreshTasks);
    } catch (error) {
      toastifyError('Error updating task');
      console.error('Error updating task:', error);
    }
  };
  // const updateTask = async (
  //   id: string,
  //   updatedTask: string,
  //   statusBoolean: boolean,
  //   updatedPriority: string,
  // ) => {
  //   console.log('Update Parameters:', id, updatedTask, statusBoolean, updatedPriority);

  //   const token = localData?.token;

  //   if (!token) {
  //     toastifyError('No token found');
  //     return;
  //   }

  //   try {
  //     await axios.put(
  //       `${config.url}/updatetodo/${id}`,
  //       { _id: id, task: updatedTask, status: statusBoolean, priority: updatedPriority },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );
  //     toastifySuccess('Task updated successfully');
  //     setRefreshTasks(!refreshTasks);
  //   } catch (error) {
  //     toastifyError('Error updating task');
  //     console.error('Error updating task:', error);
  //   }
  // };
  return (
    <Paper sx={{ p: { xs: 4, sm: 8 }, height: 1 }}>
      
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={5}
        flexWrap="wrap"
        gap={3}
      >
    
        <Typography variant="h4" color="common.white">
       
          TodoList
        </Typography>
       
       
         <UserDropdown/>
      </Stack>
      <TodoForm/>
      <Box width={1} flexGrow={1} minHeight={325}>
      <TextField
          variant="filled"
          placeholder="Search..."
          value={search}
          onChange={handleChange}
          sx={{
            '.MuiFilledInput-root': {
              bgcolor: 'grey.A100',
              ':hover': {
                bgcolor: 'background.default',
              },
              ':focus': {
                bgcolor: 'background.default',
              },
              ':focus-within': {
                bgcolor: 'background.default',
              },
            },
            borderRadius: 2,
            height: 40,
          }}
   
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <IconifyIcon icon="akar-icons:search" width={13} height={13} />
              </InputAdornment>
            ),
          }}
          
        />
        <TodoTable searchText={search} rows={tasks} onDelete={deleteTask} onUpdate={updateTask} />
      </Box>
    </Paper>
  );
};

export default Todos;
