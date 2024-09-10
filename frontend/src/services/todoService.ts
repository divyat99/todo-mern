// import axios from 'axios';
// import config from 'config';


// // Fetch todos
// export const fetchTodos = async () => {
//     try {
//       const response = await axios.get(`${config.url}/alltodo`);
//       return response.data;
//       console.log('API response:', response);
//     } catch (error) {
//       console.error('Error fetching todos:', error);
//       throw error;
//     }
//   };


// // Update a todo
// export const updateTodo = async (id, updatedData) => {
//     try {
//       const response = await axios.put(`${config.url}/updatetodo/${id}`, updatedData);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating todo:', error);
//       throw error;
//     }
//   };
// // Delete a todo
// export const deleteTodo = async (id) => {
//     try {
//       await axios.delete(`${config.url}/deletetodo/${id}`);
//     } catch (error) {
//       console.error('Error deleting todo:', error);
//       throw error;
//     }
//   };