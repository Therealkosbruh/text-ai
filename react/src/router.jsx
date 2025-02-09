import{ createBrowserRouter} from 'react-router-dom';
import Auth from './Views/Auth';
import Modelndex from './Views/modelindex';
import UserProfile from './Views/profile';

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <Auth/>
    },

    {
        path: '/talk',
        element: <Modelndex/>
    },

    {
        path: '/auth',
        element: <UserProfile/>
    },

    {
        path: '*',
        element: <Modelndex/>
    }
]);

export default router;