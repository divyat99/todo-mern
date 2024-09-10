import { ReactElement } from 'react';
import { Box, Paper, Typography } from '@mui/material';

import SaleCard from './SaleCard';
import { useTasks } from 'context/TaskContext';
import totalSales from 'assets/images/todays-todos/total-sales.png';
import totalOrder from 'assets/images/todays-todos/total-order.png';
import productSold from 'assets/images/todays-todos/product-sold.png';
import newCustomer from 'assets/images/todays-todos/new-customer.png';

const TodaysSales = (): ReactElement => {
  const { tasks } = useTasks();

  const totalTodos = tasks.length;
  const pendingTodos = tasks.filter(task => task.status===false).length;
  const completedTodos = tasks.filter(task => task?.status===true).length;
  const highPriorityTodos = tasks.filter(task => task?.priority === 'high').length;
  //console.log(totalTodos,pendingTodos,completedTodos,highPriorityTodos)
 
  
 interface TodoItem {
  id?: number;
  icon: string;
  title: string;
  subtitle: string;
  increment: number;
  color: string;
}
  const salesData: TodoItem[] = [
    {
      id: 1,
      icon: totalSales,
      title: totalTodos.toString(),
      subtitle: 'Total Todos',
      increment: 10, // Example increment
      color: 'warning.main',
    },
    {
      id: 2,
      icon: totalOrder,
      title: pendingTodos.toString(),
      subtitle: 'Pending Todos',
      increment: 14, // Example increment
      color: 'primary.main',
    },
    {
      id: 3,
      icon: productSold,
      title: completedTodos.toString(),
      subtitle: 'Completed Todos',
      increment: 2, // Example increment
      color: 'secondary.main',
    },
    {
      id: 4,
      icon: newCustomer,
      title: highPriorityTodos.toString(),
      subtitle: 'High Priority Task',
      increment: 6, // Example increment
      color: 'info.main',
    },
  ];
  return (
    <Paper sx={{ p: { xs: 4, sm: 8 }, height: 1 }}>
      <Typography variant="h4" color="common.white" mb={1.25}>
        Todo
      </Typography>
      <Typography variant="subtitle2" color="text.disabled" mb={6}>
        Todos Summary
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={{ xs: 4, sm: 6 }}>
        {salesData.map((saleItem) => (
          <Box key={saleItem.id} gridColumn={{ xs: 'span 12', sm: 'span 6', lg: 'span 3' }}>
            <SaleCard saleItem={saleItem} />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default TodaysSales;
