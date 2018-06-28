import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from './../authActions';

class SignOut extends Component {
    componentWillMount(){
        this.props.signoutUser();
    }
    render(){
        return (
            <div className={"push-container " + (this.props.push ? 'app-push' : '')}>
            <div className="app-container app-container-front">
                You have been signed out.
            </div>
        </div>
        );
    }
}

export default connect(null, { signoutUser })(SignOut);
