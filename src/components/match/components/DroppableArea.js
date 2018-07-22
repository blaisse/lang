import React, { Component } from 'react';

const style = {
    padding: '10px',
    minWidth: '250px',
    border: '1px solid black',
    margin: '10px',
    color: 'lightgray'
};

class DroppableArea extends Component {
    handleDrop = () => {
        this.props.handleDropped(this.props.index);
    }
    handleDragOver = (e) => {
        e.preventDefault();
    }
    render(){
        const { translation, content, contentIndex, index } = this.props;
        return (
            <div draggable={(content ? true : false)}
                 onDragStart={() => this.props.startDrag(contentIndex, index)}
                 onDrop={this.handleDrop} 
                 onDragOver={this.handleDragOver} 
                 style={style}>
                 <span>{(content ? content.word : translation)}</span>
            </div>
        );
    }
}

export default DroppableArea;