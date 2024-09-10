import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const App = (): ReactElement => {
  return <Outlet />;
};

export default App;
