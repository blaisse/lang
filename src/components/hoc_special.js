import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent){

    class HandleSpecial extends Component {
        setCharacter = (input) => {
            //input => String
            //Last character
            const val = input[input.length-1];
            //Input without the last character
            const sliced = input.slice(0, input.length-1);
            //Check for select numbers and add a foreign character in its place
            if(this.props.lang === 'french'){
                if(val === '1') return `${sliced}${String.fromCodePoint(233)}`;
                if(val === '2') return `${sliced}${String.fromCodePoint(231)}`;
                if(val === '3') return `${sliced}${String.fromCodePoint(234)}`;
                if(val === '4') return `${sliced}${String.fromCodePoint(249)}`;
        
            } else if(this.props.lang === 'german' || this.props.lang === null){
                if(val === '1') return `${sliced}${String.fromCodePoint(252)}`;
                if(val === '2') return `${sliced}${String.fromCodePoint(246)}`;
                if(val === '3') return `${sliced}${String.fromCodePoint(223)}`;
                if(val === '4') return `${sliced}${String.fromCodePoint(228)}`;
                if(val === '5') return `${sliced}${String.fromCodePoint(233)}`;         
            }
            return input;
        }
        handleChange = (input) => {
            //String: receive what's typed by the user "qwe123"
            return this.setCharacter(input);
        }
        render(){
            return (
                <ComposedComponent 
                    handleSpecialCharacters={this.setCharacter}   
                    {...this.props} />
            );
        }

    }
    const mapStateToProps = (state) => {
        return {
            lang: state.lang
        };
    }
    return connect(mapStateToProps)(HandleSpecial);
}