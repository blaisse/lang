import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { selectLanguage } from './../../settings/languages/languagesActions';
import { createVerb, fetchWord, patchVerb, scrapVerb, clearScrapMessage } from './../verbActions';
import SpecialCharacters from './../../special_characters';
 
class AddVerb extends Component {
    state = { 
        sameTense: false,
        tense: "",
        language: 'german',
        showManual: false,
        scrapInput: '',
        scrapError: false
    };
    renderField(field){
        const { meta: { touched, error } } = field;//field.meta.touched and field.meta.error
        const className = `input-error-container ${touched && error ? 'input-error-text' : ''}`;
        const classNameInput = `${touched && error ? 'input-error' : ''}`;
        return (
            <div className="add-verb-input">
                <div className="add-verb-input-row">
                    <label>{field.label}</label>
                    <input className={classNameInput} placeholder="" type="text" { ...field.input } onPaste={field.paste} />
                </div>
                <div className={className}>{touched ? error : ''}</div> 
            </div>
        );
    }
    componentWillUnmount(){
        this.props.clearScrapMessage();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.verb) this.setState({ scrapInput: '' });
    }
    onSubmit(values){
        //values are in a different format than needed to be in DB
        let l = this.props.lang;
        if(!l) l = 'german';  
        const db_obj = {
            word: values.word,
            meaning: values.meaning,
            lang: l,
            tenses: [
                { 
                    tense: values.tense,
                    conjugation: {
                        je: values.je,
                        tu: values.tu,
                        il: values.il,
                        elle: values.elle,
                        on: values.on,
                        nous: values.nous,
                        vous: values.vous,
                        ils: values.ils,
                        elles: values.elles
                    }
                }
            ]
        };
        this.setState({ sameTense: false, tense: db_obj.tenses[0].tense });
        this.props.fetchWord(db_obj.word).then((ret) => {
            if(ret.payload.data === ""){
                //there is no such word, create a new one
                this.props.createVerb(db_obj).then(() => {
                    //possibly reset state here
                    //WHY am i resetting state if im pushing history right after?
                    this.setState({ sameTense: false, tense: "", language: this.state.language });
                    this.props.history.push("/");
                });
            } else {
                //update existing record
                ret.payload.data.tenses.forEach((item) => {
                    if(item.tense === this.state.tense){//db_obj.conj[0].time
                        return this.setState({ sameTense: true, tense: item.tense, language: this.state.language });
                    }
                });
                if(!this.state.sameTense){
                    this.setState({ sameTense: false, tense: "", language: this.state.language });
                    //tenses are different - update record
                    ret.payload.data.tenses.push(db_obj.tenses[0]);
                    // console.log(ret.payload.data);
                    this.props.patchVerb(ret.payload.data);
                    this.props.history.push('/panel');      
                }
            }
        });
    }
    renderLanguage(){
        if(this.props.lang === 'german' || this.props.lang === null){
            return <div className="add-verb-click">French</div>;
        } else {
            return <div className="add-verb-click">German</div>;
        }
    }
    handleLanguage(){
        if(this.props.lang === 'german' || this.props.lang === null){
            this.props.selectLanguage('french');
            // this.setState({ sameTense: this.state.sameTense, tense: this.state.tense, language: 'french' }, () => {
            //     console.log(this.state);
            // });
        } else {
            this.props.selectLanguage('german');
            // this.setState({ sameTense: this.state.sameTense, tense: this.state.tense, language: 'german' });
        }
    }
    handleNothing(){}
    handlePaste = (e) => {
        console.log('change', this.props.change); 
        console.log('pasting', e.clipboardData.getData('text/plain'));
        const pasted = e.clipboardData.getData('text/plain').replace(/\r?\n|\r/g, "-").trim();
        const fullySplitString = pasted.replace(/-/g, " ");
        const pastedSpaceSplit = fullySplitString.split(" ");

        //turn the array into an object { "je": "reviens" }
        const pastedObject = {};
        pastedSpaceSplit.forEach((item, i) => {
            if(i % 2 === 0){
                pastedObject[item] = "";
            } else {
                pastedObject[pastedSpaceSplit[i-1]] = item;
            }
        });

        const fieldNames = ["ich", "du", "er_sie_es", "wir", "ihr", "sie_Sie"];

        Object.keys(pastedObject).forEach((field, i) => {
            this.props.change(fieldNames[i], pastedObject[field]);
        });

        //setTimeout is used to clear the Verb input where data was pasted, setTimeout gets delegated
        //and the input in cleared just after the text is pasted
        setTimeout(() => {
            this.props.change("word", "");
        }, 1);
    }
    displayForm(){
        if(this.state.showManual || this.props.lang === 'german'){
            const { handleSubmit } = this.props;
            const p = this.props.pronouns[this.props.lang];
            return (
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} autoComplete="off">
                    <Field ref={input => this.word = input} paste={this.handlePaste} normalize={this.props.handleSpecialCharacters.bind(this)} label="Verb" name="word" component={this.renderField} />
                    <Field label="Meaning" name="meaning" component={this.renderField} />
                    <Field label="Tense" name="tense" component={this.renderField} />
                    {/* <Field label="Language" name="lang" component={this.renderField} /> */}
                    {
                        this.state.sameTense === true &&
                        <div className="same-tense">This tense has already been added</div>
                    }
                    <Field normalize={this.props.handleSpecialCharacters} label={p[0].word} name="je" component={this.renderField} />
                    <Field normalize={this.props.handleSpecialCharacters} label={p[1].word} name="tu" component={this.renderField} />
                    <Field normalize={this.props.handleSpecialCharacters} label={p[2].word} name="il" component={this.renderField} />
                    <Field normalize={this.props.handleSpecialCharacters} label={p[3].word} name="elle" component={this.renderField} />
                    <Field normalize={this.props.handleSpecialCharacters} label={p[4].word} name="on" component={this.renderField} />
                    <Field normalize={this.props.handleSpecialCharacters} label={p[5].word} name="nous" component={this.renderField} />
                    <Field normalize={this.props.handleSpecialCharacters} label={p[6].word} name="vous" component={this.renderField} />
                    <Field normalize={this.props.handleSpecialCharacters} label={p[7].word} name="ils" component={this.renderField} />
                    <Field normalize={this.props.handleSpecialCharacters} label={p[8].word} name="elles" component={this.renderField} />

                    <button type="submit">Save</button>
                </form>
            );
        }
    }
    showManual = () => {
        this.setState({ showManual: !this.state.showManual });
    }
    changeScrapInput = e => {
        this.setState({ scrapInput: this.props.handleSpecialCharacters(e.target.value) });
    }
    submitScrap = (e) => {
        e.preventDefault();
        if(this.state.scrapInput.length < 3) this.setState({ scrapError: true, scrapInput: '' });
        else this.props.scrapVerb(this.state.scrapInput.trim());
    }
    displayMessage(){
        if(this.props.verb.scrapMessage && this.props.lang !== 'german') return <p>{this.props.verb.scrapMessage}</p>;
    }
    clearFocus = () => {
        if(this.props.verb.scrapMessage) this.props.clearScrapMessage();
        this.setState({ scrapError: false })
    }
    displayScraper(){
        if(this.props.verb.loading) return <div className="scrap-loader">Processing..</div>;
        if(this.props.lang !== 'german'){
            return (
                <form onSubmit={this.submitScrap} className="add-verb-scrap">
                    <input 
                        className="add-verb-scrap-input"
                        placeholder='French infinitive'
                        onFocus={this.clearFocus} 
                        key='1' type='text' 
                        value={this.state.scrapInput} 
                        onChange={this.changeScrapInput} />
                    <button
                        key='2' 
                        // onClick={this.submitScrap}
                        className="add-verb-scrap-button">
                        Scrap</button>
                </form> 
            );
        }
        return 'Scraping is enabled only for French verbs';
    }

    render(){
        // let p;
        // if(this.props.lang === 'german' || this.props.lang === null){
        //     p = ['Ich', 'Du', 'Er, sie, es', 'Wir', 'Ihr', 'Sie, sie'];
        // } else if(this.props.lang === 'french'){
        //     p = ['Je', 'Tu', 'Il, elle', 'Nous', 'Vous', 'Ils, elles'];
        // }
        return ( 
            <div className="add-verb-container">
            <div className="add-verb-inner">
                <div className="add-verb-language" onClick={this.handleLanguage.bind(this)}>
                    Edit different language:
                    {this.renderLanguage()}
                </div>
                <div className="add-verb-scrap-message">{this.displayMessage()}</div>
                {this.displayScraper()}
                {/* {(this.props.lang === 'german' ?  'Scraping is enabled only for French verbs' : 
                    <form onSubmit={this.submitScrap} className="add-verb-scrap">
                        <input 
                            className="add-verb-scrap-input"
                            onFocus={this.clearFocus} 
                            key='1' type='text' 
                            value={this.state.scrapInput} 
                            onChange={this.changeScrapInput} />
                        <button
                            key='2' 
                            // onClick={this.submitScrap}
                            className="add-verb-scrap-button">
                            Scrap</button>
                    </form>
                )} */}
                <div className="add-verb-scrap-message">{(this.state.scrapError ? 'Enter at least 3 characters' : null)}</div>
                {this.props.lang === 'german' ? null : <div className="add-manual" onClick={this.showManual}>{(this.state.showManual ? 'Hide form' : 'Add manually')}</div>}
                {this.displayForm()}
                <SpecialCharacters handleClick={this.handleNothing} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        pronouns: state.data.pronouns.subject,
        lang: state.lang,
        verb: state.verb
    };
}

function validate(values){
    const errors = {};

    if(!values.word || values.word.length < 2) errors.word = "Enter a verb";
    if(!values.meaning) errors.meaning = "Meaning missing";
    if(!values.tense) errors.tense = "Tense missing";
    if(!values.je) errors.je = "Empty field";
    if(!values.tu) errors.tu = "Empty field";
    if(!values.il) errors.il = "Empty field";
    if(!values.elle) errors.elle = "Empty field";
    if(!values.on) errors.on = "Empty field";
    if(!values.nous) errors.nous = "Empty field";
    if(!values.vous) errors.vous = "Empty field";
    if(!values.ils) errors.ils = "Empty field";
    if(!values.elles) errors.elles = "Empty field";

    return errors;
}

export default reduxForm({
    validate,
    form: 'PostVerb'
})(
    connect(mapStateToProps, { createVerb, fetchWord, patchVerb, selectLanguage, scrapVerb, clearScrapMessage })(AddVerb)
);