import React, { Component } from 'react';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = { value: "" };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({ value: e.target.value }, () => {
            this.props.sendInput(this.state.value);
        });
    }
    render(){
        return <input onChange={this.handleChange} type="text" value={this.state.value} placeholder="What to do.." />;
    }
}

export default Search;