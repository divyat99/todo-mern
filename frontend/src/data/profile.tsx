import { useState, useEffect } from 'react';
import { Button, TextField, Avatar, Box, Typography, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { toastifySuccess, toastifyError, getAllLocatData } from 'Utility/Utility';
import profile from 'assets/images/account/Profile.jpg';

const Profile = () => {
  const user = getAllLocatData();
  console.log(user,'finddddddddddddddddddddd')
  const id = user?._id;
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    image: user?.image || profile
  });
  const [newName, setNewName] = useState(userData.name);
  const [newEmail, setNewEmail] = useState(userData.email);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [token] = useState(user?.token || '');

  useEffect(() => {
    // Update the local state if userData changes
    setNewName(userData.name);
    setNewEmail(userData.email);

  }, [userData]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewImage(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!token) {
      toastifyError('No token found. Please log in again.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newName);
      formData.append('email', newEmail);
      if (newImage) {
        formData.append('image', newImage);
      }

      const response = await fetch(`http://localhost:4000/api/user/update/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          // Do not set Content-Type for FormData
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile. Please try again.');
      }

      // Update local state with updated user data
      const updatedData = await response.json();
      setUserData({
        ...userData,
        name: updatedData.name,
        email: updatedData.email,
        image: updatedData.image || userData.image,
      });

      toastifySuccess('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toastifyError(error.message || 'Failed to update profile. Please check your connection and try again.');
    }
  };
console.log (userData?.image)
  return (
    <Box style={{ padding: '16px', maxWidth: '400px', margin: '0 auto' }}>
      <Typography variant="h6" gutterBottom>
        Update Profile
      </Typography>
      <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
        <Avatar
          src={newImage ? URL.createObjectURL(newImage) : userData?.image}
          style={{ width: '100px', height: '100px', marginBottom: '16px' }}
        />
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input
            accept="image/*"
            type="file"
            hidden
            onChange={handleImageChange}
          />
          <PhotoCamera />
        </IconButton>
      </Box>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={newName}
        onChange={handleNameChange}
        style={{ marginBottom: '16px' }}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        type="email"
        value={newEmail}
        onChange={handleEmailChange}
        style={{ marginBottom: '16px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save Changes
      </Button>
    </Box>
  );
};

export default Profile;
