import { Navigate } from 'react-router-dom';
import LayoutAdmin from '../pages/admin';
import Login from '../pages/website/Auth/Login';

type Props = {}

const PrivateRouter = ({props}:any) => {
    const user = localStorage.getItem("User");
     if(user) {
        return  <LayoutAdmin {...props} />
     } else {
        return <Navigate to="/login" />
     }
}
export default PrivateRouter