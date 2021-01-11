import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import LoadingScreen from '../loading.screen/loading.screen'
import './home.screen.scss'

const HomeScreen = ({user}) => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(history.location.state?.isMounted) {
            setLoading(false)
            return
        }
        const timeout = setTimeout(() => {
            setLoading(false)
        }, 0)
        return () => {
            clearTimeout(timeout)
        }
    })

    const select = (option) => {
        if(user) {
            history.push(option)
        } else {
            history.push({
                pathname: '/auth',
                state: {pathname: option}
            })
        }
    }

    return (
        loading ? <LoadingScreen />:
        <div id="home-screen-container">
            <p className="title">Select an option...</p>
            <div className="options">
                <div onClick={() => select('/yd-monitoring')} className="option option--1">
                    <h4 className="option-name">YD Monitoring</h4>
                </div>
                <div onClick={() => select('/sata-dashboard')} className="option option--2">
                    <h4 className="option-name">SATA Dashboard</h4>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ AuthReducer }) => ({
    user: AuthReducer.user
})
export default connect(mapStateToProps)(HomeScreen);