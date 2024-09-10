import { useState, ReactElement, PropsWithChildren } from 'react';
import { Box, Drawer, Toolbar } from '@mui/material';
import Topbar from './Topbar/Topbar';
import Sidebar from './Sidebar/Sidebar';
import Footer from './Footer/Footer';

export const drawerOpenWidth = 240;
export const drawerCloseWidth = 110;

const MainLayout = ({ children }: PropsWithChildren): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const handleDrawerToggle = () => setOpen(!open);

  return (
    <>
      <Box
        component="main"
        overflow="auto"
        sx={{
          width: '100%',
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: { xs: 2, sm: 5 }, // padding on left and right
          pt: 0,
          pb: 6.25,
          // Define a maximum width for the content box
          '& > .content': {
            width: '100%',
            maxWidth: 1200, // Adjust as needed
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar sx={{ height: 96 }} />
        <Box className="content">
          {children}
        </Box>
      </Box>
      <Footer open={open} />
    </>
  );
};

export default MainLayout;
