import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import LoadingScreen from '../loading.screen/loading.screen'
import './home.screen.scss'

const HomeScreen = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)

    if(loading) {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    const select = (option) => {
        localStorage.setItem('option', option)
        history.push('/auth')
    }

    return (
        loading ? <LoadingScreen />:
        <div id="home-screen-container">
            <p className="title">Select a option...</p>
            <div className="options">
                <div className="option option--1">
                    <h4 onClick={() => select('yd-monitoring')} className="option-name">YD Monitoring</h4>
                </div>
                <div className="option option--2">
                    <h4 onClick={() => select('sata-dashboard')} className="option-name">SATA Dashboard</h4>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;