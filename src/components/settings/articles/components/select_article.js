import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectArticle extends Component {
    render(){
        return (
            <div>
                Select article
            </div>
        );
    }
}

const mapState = state => {
    return {

    };
};

export default connect(mapState)(SelectArticle);