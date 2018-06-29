import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectLanguage } from './../languagesActions';

class DisplayLanguages extends Component {
    renderLanguages(){
        return this.props.languages.map((item) => {
            return (
                <div className="single-language" key={item} onClick={() => {
                    this.props.selectLanguage(item);
                    document.querySelector('.app').focus();
                    }}>
                    <Link to='/tenses'>{this.displayFlag(item)}</Link>
                </div>
            );
        });
    }
    displayFlag(item){
        if(item === 'french'){
            return (
                <div>
                    <img className="flag-french" src={require('./img/french.png')} alt="French flag" />
                </div>
            );
        } else {
            return (
                <div>
                    <img className="flag-german" src={require('./img/german.png')} alt="German flag" />
                </div>
            );
        }
    }
    render(){
        return (
            <div className="app-container app-container-front">
                {/* <h2 className="flags-header">Select a language to learn</h2> */}
                <div className="flags-container">
                    <div className="flags-container-flags">{this.renderLanguages()}</div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        languages: state.languages,
    };
}

export default connect(mapStateToProps, { selectLanguage })(DisplayLanguages);