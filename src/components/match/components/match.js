import React, { Component } from 'react';
import DraggableItem from './draggableItem';
import DroppableArea from './DroppableArea';

const style = {
    display: 'flex'
};

class Match extends Component {
    state = {
        dragging: null,
        alreadyDropped: false,
        alreadyDroppedIndex: null,
        dropped: {}
    };
    handleStartDrag = (index) => {
        this.setState({ dragging: index });
    }
    handleDroppableDrag = (index, alreadyDroppedIndex) => {
        this.setState({ dragging: index, alreadyDropped: true, alreadyDroppedIndex });
    }
    displayDraggable(){
        return this.props.set.map((item, i) =>
            <DraggableItem startDrag={this.handleStartDrag} index={i} name={item.word} key={i} />
        );
    }
    displayDropable(){
        return this.props.set.map((item, i) => {
            return <DroppableArea
                    content={(this.state.dropped.hasOwnProperty(i) ? this.props.set[this.state.dropped[i]] : false)}
                    contentIndex={(this.state.dropped.hasOwnProperty(i) ? this.state.dropped[i] : false)}//this.state.dropped[i]
                    startDrag={this.handleDroppableDrag}
                    translation={item.meaning} 
                    key={i} 
                    index={i} 
                    handleDropped={this.handleDropped} />
        });
    }
    handleDropped = (index) => {//[...this.state.dropped, { where: index, which: this.state.dragging }]
        const dropped = this.state.dropped;
        if(dropped.hasOwnProperty(index)){
            dropped[this.state.alreadyDroppedIndex] = dropped[index];
        } else {
            delete dropped[this.state.alreadyDroppedIndex];
        }
        dropped[index] = this.state.dragging; 
        this.setState({ dropped, dragging: null, alreadyDropped: false, alreadyDroppedIndex: null });
    }
    render(){
        return (
            <div style={style}>
                <div className="match-draggable">{this.displayDraggable()}</div>
                <div>{this.displayDropable()}</div>
            </div>
        );
    }
}

export default Match;