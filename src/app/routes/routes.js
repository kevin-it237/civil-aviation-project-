import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux'
import PrivateRoute from './private.route';
import NormalRoute from './normal.route';

import HomeScreen from '../screens/home/home.screen'
import AuthScreen from '../../applications/auth/screens/auth.screen/auth.screen'
import SaatmDashboard from '../../applications/saatmDashboard/screens/saatmDashboard'
import YDSystemDashboard from '../../applications/ydMonitoring/screens/ydMonitoringDashboard'
import Help from '../../applications/help/screens/help'

/**
 * @description this is the main routes for the main application src/app. 
 */
const Routes = () => {

    return (
        <Switch>
            <PrivateRoute path={"/yd-monitoring"}>
                <Route 
                    exact 
                    component={YDSystemDashboard}
                    path={"/yd-monitoring"} />
            </PrivateRoute>
            
            <PrivateRoute path={"/saatm-dashboard"}>
                <Route 
                    exact 
                    component={SaatmDashboard}
                    path={"/saatm-dashboard"} />
            </PrivateRoute>

            <PrivateRoute path={"/help"}>
                <Route 
                    exact 
                    component={Help}
                    path={"/help"} />
            </PrivateRoute>
            
            <NormalRoute>
                <Route 
                    exact
                    component={HomeScreen}
                    path={'/'} />
                <Route 
                    exact
                    component={AuthScreen}
                    path={'/auth'} />
            </NormalRoute>


        </Switch>)
}

const mapStateToProps = () =>({
});

export default connect(mapStateToProps)(Routes);
