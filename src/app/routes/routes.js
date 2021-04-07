import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux'
import PrivateRoute from './private.route';
import NormalRoute from './normal.route';

import HomeScreen from '../screens/home/home.screen'
import AuthScreen from '../../applications/auth/screens/auth.screen/auth.screen'
import SaatmDashboard from '../../applications/saatmDashboard/screens/saatmDashboard'
import YDSystemDashboard from '../../applications/ydMonitoring/screens/ydMonitoringDashboard'
import AdminDashboard from '../../applications/adminDashboard/screens/adminDashboard/adminDashboard'
import Profile from '../../applications/auth/screens/profile.screen/profile.screen'
import Help from '../../applications/help/screens/help'
import ELibrary from '../../applications/ELibrary/screens/eLibrary'
import Definitions from '../../applications/ELibrary/screens/definitions'
import Reports from '../../applications/report/screens/report'
import Comments from '../components/add.comment/add.comment'

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
            
            <PrivateRoute path={"/profile"}>
                <Route 
                    exact 
                    component={Profile}
                    path={"/profile"} />
            </PrivateRoute>
            
            <PrivateRoute path={"/administration"}>
                <Route 
                    exact 
                    component={AdminDashboard}
                    path={"/administration"} />
            </PrivateRoute>

            <PrivateRoute path={"/help"}>
                <Route 
                    exact 
                    component={Help}
                    path={"/help"} />
            </PrivateRoute>

            <PrivateRoute path={"/e-library"}>
                <Route 
                    exact 
                    component={ELibrary}
                    path={"/e-library"} />
            </PrivateRoute>

            <PrivateRoute path={"/definitions"}>
                <Route 
                    exact 
                    component={Definitions}
                    path={"/definitions"} />
            </PrivateRoute>

            <PrivateRoute path={"/reports"}>
                <Route 
                    exact 
                    component={Reports}
                    path={"/reports"} />
            </PrivateRoute>

            <PrivateRoute path={"/comments"}>
                <Route 
                    exact 
                    component={Comments}
                    path={"/comments"} />
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
