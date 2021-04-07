import {useEffect, useState} from 'react';
import Routes from '../app/routes/routes';
import { useDispatch } from 'react-redux';
import {connect} from 'react-redux'
import {setConnectedUsers} from '../applications/adminDashboard/redux/reducer/actions'
import { authCurrentAuthenticatedUser } from '../applications/auth/redux/reducer/actions';

import {config} from '../helpers/constants'

const io = require('socket.io-client');
const socket = io(`${config.API_URL}`);

const App = ({user}) => {
    const [hasMountedBefore, setHasMountedBefore] = useState(false);
    const dispatch = useDispatch();
    /**
     * @description whenever the application mounts we make a api call
     * to aws server to check the current authticated user
     */

    useEffect(() => {
        if(user) {
            socket.emit("new logged user", JSON.stringify(user));
            socket.on('users online', (users) => {
                const usersOnline = JSON.parse(users);
                console.log(usersOnline)
                dispatch(setConnectedUsers(usersOnline))
            });
        }
    }, [user])

    useEffect(() => {
        if(hasMountedBefore){ return }
        dispatch(authCurrentAuthenticatedUser());
        setHasMountedBefore(true);
    }, [])

    return <Routes />
}

const mapStateToProps = ({AuthReducer, AdminReducer}) =>({
    user: AuthReducer.user
});

export default connect(mapStateToProps)(App);