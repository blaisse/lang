import React, { Component } from 'react';
import { connect } from 'react-redux';
import Match from './match';
import { fetch_match_set } from '../matchActions';

const actions = {
    fetch_match_set
};

class MatchContainer extends Component {
    componentWillMount(){
        this.props.fetch_match_set();
    }
    render(){
        if(!this.props.match.length) return null;
        return <Match set={this.props.match} />;
    }
}

const mapState = state => {
    return {
        match: state.match
    };
}

export default connect(mapState, actions)(MatchContainer);