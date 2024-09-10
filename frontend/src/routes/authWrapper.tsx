import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from 'Utility/Utility'; // Adjust import based on your actual file structure

interface AuthWrapperProps {
  children: ReactElement;
}

const AuthWrapper = ({ children }: AuthWrapperProps): ReactElement => {
  if (!auth()) {
    return <Navigate to="/authentication/login" />;
  }

  return children;
};

export default AuthWrapper;
