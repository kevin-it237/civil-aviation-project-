import React, {useEffect} from 'react'
import {NavLink, Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import {authLogout} from '../../../applications/auth/redux/reducer/actions'
import {connect, useDispatch} from 'react-redux'

import './mainHeader.scss'


/**
 * @description Header
 * @param {string} page yd or saatm
 */

const MainHeader = ({user}) => {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const logout = () => {
        dispatch(authLogout())
        setTimeout(() => {
            history.push('/')
        }, 1000);
    }

    useEffect(() => {
        
    }, [])

    return (
        <div className="main-header">
            <Link to='/' className="logo">Home</Link>
            <div className="header-right">
                <NavLink exact={true} to='/yd-monitoring'>YD Monitoring System</NavLink>
                <NavLink exact={true} to='/saatm-dashboard'>SAATM Dashboard</NavLink>
                {user.role === 'admin'&&<NavLink exact={true} to='/administration'>Admin Dashboard</NavLink>}
                <NavLink exact={true} to='/help'>Help</NavLink>
                <NavLink onClick={logout} exact={true} to='/logout'>Logout</NavLink>
            </div>
        </div>
    )
}



const mapStateToProps = ({ AuthReducer }) => ({
    user: AuthReducer.user,
})

export default connect(mapStateToProps)(MainHeader);

