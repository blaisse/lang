import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addNoun, getNoun } from './../../../actions';
import SpecialCharacters from './../../special_characters';

class AddNoun extends Component{
    constructor(props){
        super(props);
        this.state = { exists: false };
    }
    renderField(field){
        const { meta: { touched, error } } = field;//field.meta.touched and field.meta.error
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
        let language = 'german';
        if(this.props.lang){
            language = this.props.lang;
        }
        values.lang = language;
 
        this.props.getNoun(values.word).then((ret) => {
            if(!(ret.payload.data === "")){
                this.setState({ exists: true });
            } else {
                this.props.addNoun(values).then(() => {
                    this.props.history.push('/panel');
                });
            }
        });
    }
    displayError(){
        if(this.state.exists === true){
            return <div>This word is already saved!</div>;
        }
    }
    handleNothing(){}
    render(){
        const { handleSubmit } = this.props;
        return (
            <div className="add-verb-container">
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field normalize={this.props.handleSpecialCharacters} label="Article" name="article" component={this.renderField} />
                    <Field normalize={this.props.handleSpecialCharacters} label="Noun" name="word" component={this.renderField} />
                    {this.displayError()}
                    <Field normalize={this.props.handleSpecialCharacters} label="Plural" name="plural" component={this.renderField} />
                    <Field label="Meaning" name="meaning" component={this.renderField} />
                    <Field label="Image" name="img" component={this.renderField} />
                    <button type="submit">Save</button>
                </form> 
                <SpecialCharacters handleClick={this.handleNothing} />
            </div>
        );
    }
}
function validate(values){
    const errors = {};
    if(!values.article) errors.article = "Enter an article";
    if(!values.word) errors.word = "Enter the noun";
    if(!values.plural) errors.plural = "Enter plural";
    if(!values.meaning) errors.meaning = "Enter an English translation";
    return errors;
}

function mapStateToProps(state){
    return {
        lang: state.lang
    };
}

export default reduxForm({
    validate,
    form: 'PostNoun'
})(
    connect(mapStateToProps, { addNoun, getNoun })(AddNoun)
);