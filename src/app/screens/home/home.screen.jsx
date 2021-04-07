import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { Typography } from 'antd';
import { DashboardFilled, MonitorOutlined } from '@ant-design/icons';
import img1 from '../../../assets/images/1.png'
import img2 from '../../../assets/images/2.png'
import img3 from '../../../assets/images/3.png'
import img4 from '../../../assets/images/4.png'
import img5 from '../../../assets/images/5.png'
import logo from '../../../assets/images/logo.PNG'
import {Button} from 'antd'
import './home.screen.scss'

const { Title } = Typography;

const HomeScreen = ({user}) => {
    const history = useHistory()

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
        <div id="home-screen-container">
            {/* <h3 id='exit' onClick={() => history.push('/comments')}>Exit</h3> */}
            <img src={logo} alt=""/>
            <Title className="title">Welcome to the Yamoussoukro Decision <br/> Monitoring System and SAATM Dashboard</Title>
            <div className="system-description">
                <p>Beta version 1.0  - release April 2021</p>
                <Button size='large' onClick={() => select('/saatm-dashboard')} >CONTINUE</Button>
                <article><p>The Monitoring Tool  is released for the purpose of providing the main functionalities and data views for the Beta version of the YD monitoring and SAATM dashboard. This is released for the use by  UNECA/AFCAC  under the terms of the  engagement.</p></article>
            </div>
            {/* <p className="select">Please select</p>
            <div className="options">
                <div onClick={() => select('/yd-monitoring')} className="option option--1">
                    <DashboardFilled />
                    <h4 className="option-name">YD Monitoring</h4>
                </div>
                <div onClick={() => select('/saatm-dashboard')} className="option option--2">
                    <MonitorOutlined />
                    <h4 className="option-name">SAATM KPIs/Dashboard</h4>
                </div>
            </div>

            <div className="icons">
                <img src={img1} alt=""/>
                <img src={img2} alt=""/>
                <img src={img3} alt=""/>
                <img src={img4} alt=""/>
                <img src={img5} alt=""/>
            </div> */}
        </div>
    )
}

const mapStateToProps = ({ AuthReducer }) => ({
    user: AuthReducer.user
})
export default connect(mapStateToProps)(HomeScreen);