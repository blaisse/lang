import React, { Component } from 'react';

class Tutorial extends Component {
    constructor(props){
        super(props);
        this.editor = null;
    }
    componentDidMount(){

    }
    render(){
        return (
            <div className="verb-container">
                <div className="editor"></div>
            </div>
        );
    }
}

export default Tutorial;
