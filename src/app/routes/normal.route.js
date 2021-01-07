import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/**
 * @description creates a normal route to any route.
 * @observe if user is logged in this route will push the user to the tracker screen
 */
const NormalRoute = ({user, children, path, component, ...rest}) => {
    if(user) { return <Redirect to="/home" /> }
    return <Route exact path={path} render={component ? component : () => children}/>;
}

const mapStateToProps = ({AuthReducer}) => ({
    user: AuthReducer.user,
})
export default connect(mapStateToProps)(NormalRoute);