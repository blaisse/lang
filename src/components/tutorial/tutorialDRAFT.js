import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw } from 'draft-js';

class Tutorial extends Component {
    constructor(props){
        super(props);
        this.state = { editorState: EditorState.createEmpty() };

        this.focus = () => this.refs.editor.focus();

        this.onChange = (editorState) => this.setState({ editorState });
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this.mapKeyToEditorCommand.bind(this);
        this.onTab = this.onTab.bind(this);

        this.x = {};
    }
    handleKeyCommand(command, editorState){
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if(newState){
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
    mapKeyToEditorCommand(e){
        if(e.keyCode === 9){//Tab
            console.log('tab');
            const newEditorState = RichUtils.onTab(e, this.state.editorState, 4);
            if(newEditorState !== this.state.editorState){
                this.onChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }
    onTab(e){
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }
    onBoldClick(){
        this.x = convertToRaw(this.state.editorState.getCurrentContent());
        // console.log();
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }
    render(){
        return (
            <div className="verb-container">
                <div className="tutorial">
                    <div className="tutorial-buttons">
                        <button onClick={this.onBoldClick.bind(this)}>Bold</button>
                    </div>
                    <div onClick={this.focus}>
                    <Editor 
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        onTab={this.onTab}
                        ref="editor"
                        // keyBindingFn={this.mapKeyToEditorCommand}
                    />
                    </div>
                </div>
                <div></div>
            </div>
        );
    }
}

export default Tutorial;