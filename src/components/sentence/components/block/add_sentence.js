import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { saveSentence } from './../../../../actions';
import SpecialCharacters from './../../../special_characters';

class AddSentence extends Component {
    renderField(field){
        const { meta: { touched, error } } = field;
        const className = `input-error-container ${touched && error ? 'input-error-text' : ''}`;
        const classNameInput = `${touched && error ? 'input-error' : ''}`;
        return (
            <div className="add-verb-input">
                <div className="add-verb-input-row">
                    <label>{field.label}</label>
                    <input className={classNameInput} placeholder="" type="text" { ...field.input } />
                </div>
                <div className={className}>{touched ? error : ''}</div> 
            </div>
        );
    }
    onSubmit(values){
        let lang = 'german';
        if(this.props.lang){
            lang = this.props.lang;
        }
        values.lang = lang;
        this.props.saveSentence(values).then(() => {
            this.props.reset();
            this.props.history.push('/panel');
        });
    }
    handleNothing(){}
    render(){
        const { handleSubmit } = this.props;
        return (
            <div className="add-verb-container">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field normalize={this.props.handleSpecialCharacters} label="Sentence" name="sentence" component={this.renderField} />
                    <Field label="Translation" name="translation" component={this.renderField} />
                    <Field label="Level" name="level" component={this.renderField} />
                    <button type="submit">Save</button>
                </form>
                <SpecialCharacters handleClick={this.handleNothing} />
            </div>
        );
    }
}

function validate(values){
    const errors = {};
    if(!values.level) errors.level = "Enter level";
    if(!values.sentence) errors.sentence = "Enter the sentence";
    if(!values.translation) errors.translation = "Enter an English translation";
    return errors;
}

function mapStateToProps(state){
    return {
        lang: state.lang
    };
}

export default reduxForm({
    validate,
    form: 'PostSentence'
})(
    connect(mapStateToProps, { saveSentence })(AddSentence)
);