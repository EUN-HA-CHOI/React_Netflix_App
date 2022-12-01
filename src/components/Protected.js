import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../routes/Auth';

export default function Protected({ children }){
  const { user } = useAuthContext();

  if (!user){
    return <Navigate to='/login' />;
  }
  return children;
  
}