import {useEffect, useState} from 'react';
import Routes from '../app/routes/routes';
import { useDispatch } from 'react-redux';
import { authCurrentAuthenticatedUser } from '../applications/auth/redux/reducer/actions';


const App = () => {
    const [hasMountedBefore, setHasMountedBefore] = useState(false);
    const dispatch = useDispatch();
    /**
     * @description whenever the application mounts we make a api call
     * to aws server to check the current authticated user
     */

    useEffect(() => {
        if(hasMountedBefore){ return }
        dispatch(authCurrentAuthenticatedUser());
        setHasMountedBefore(true);
    }, [])

    return <Routes />
}

export default App;