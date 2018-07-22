import React, { Component } from 'react';

const style = {
    padding: '10px',
    border: '1px solid black',
    margin: '10px',
    textAlign: 'center'
};

class DraggableItem extends Component {
    state = { dragged: false };
    handleDragStart = () => {
        // this.setState({ dragged: true });
        this.props.startDrag(this.props.index)
    }
    render(){
        return (
            <div className={`match-draggable-item ${(this.state.dragged ? 'match-draggable-item-dragged' : '')}`}
                 draggable={(this.state.dragged ? false : true)} 
                 onDragStart={this.handleDragStart}>
            {this.props.name}</div>
        );
    }
}

export default DraggableItem;