import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signupUser, authClean } from './../authActions';

class SignUp extends Component {
    componentWillMount(){
        this.props.authClean();
    }
    renderField(field){
        const { meta: { touched, error } } = field;
        const className = `input-error-container ${touched && error ? 'input-error-text' : ''}`;
        const classNameInput = `${touched && error ? 'input-error' : ''}`;
        return (
            <div className="add-veb-input">
                <div className="add-verb-input-row signup">
                    <label>{field.label}</label>
                    <input className={classNameInput} type={field.type} autoComplete="off" { ...field.input } />
                </div>
                <div className={className}>{touched ? error : ''}</div>
            </div>
        );
    }
    handleForm(values){
        this.props.signupUser(values, this);
    }
    renderError(){
        if(this.props.error){
            return (
                <div className="server-error">{this.props.error}</div>
            );
        }
    }
    render(){
        const { handleSubmit } = this.props;
        return (
            <div className="add-verb-container">
                <form onSubmit={handleSubmit(this.handleForm.bind(this))}>
                    <Field type="text" label="Username" name="email" component={this.renderField} />
                    <Field type="password" label="Password" name="password" component={this.renderField} />
                    <Field type="password" label="Re password" name="repassword" component={this.renderField} />
                    {this.renderError()}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        );
    }
}

function validate(values){
    const errors = {};

    if(!values.email) errors.email = 'Enter a username';
    if(!values.password) errors.password = 'Enter a password';
    if(!values.repassword) errors.repassword = 'Enter password again';

    if(values.repassword !== values.password) errors.repassword = 'Passwords must match';

    return errors;
}

function mapStateToProps(state){
    return {
        error: state.auth.error
    };
}

export default reduxForm({
    validate,
    form: 'SignUp'
})(
    connect(mapStateToProps, { signupUser, authClean })(SignUp)
);