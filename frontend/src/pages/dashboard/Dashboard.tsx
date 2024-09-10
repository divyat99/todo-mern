import { ReactElement } from 'react';
import { Box } from '@mui/material';
// import TodaysSales from 'components/sections/dashboard/todays-todos/TodaysSales';
import Customers from 'components/sections/dashboard/todos/todos';
//import TodoForm from 'components/sections/dashboard/todos/todoForm';

const Dashboard = (): ReactElement => {
  return (
    <>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3.5}>
       
       
      
     
        <Box gridColumn={{ xs: 'span 12', '2xl': 'span 6' }} order={{ xs: 7 }}>
      
          <Customers />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
