import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux'
import PrivateRoute from './private.route';
import NormalRoute from './normal.route';

import HomeScreen from '../screens/home/home.screen'
import AuthScreen from '../../applications/auth/screens/auth.screen/auth.screen'
import YDMonitoring from '../../applications/ydMonitoring/screens/ydMonitoring'

/**
 * @description this is the main routes for the main application src/app. 
 */
const Routes = () => {

    return (
        <Switch>
            <NormalRoute>
                <Switch>
                    <Route 
                        exact
                        component={HomeScreen}
                        path={'/'} />
                    <Route 
                        exact
                        component={AuthScreen}
                        path={'/auth'} />
                </Switch>
            </NormalRoute>

            <PrivateRoute path={"/yd-monitoring"} >
                <Switch>
                    <Route 
                        exact 
                        component={YDMonitoring}
                        path={"/yd-monitoring"} />
                </Switch>
            </PrivateRoute>

        </Switch>)
}

const mapStateToProps = () =>({
});

export default connect(mapStateToProps)(Routes);
