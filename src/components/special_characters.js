import React, { Component } from 'react';
import { connect } from 'react-redux';

class SpecialCharacters extends Component {
    render(){
         if(this.props.lang === 'german' || this.props.lang === null){
            return (
                <div className="special-characters">
                  <div className="special-characters-clicks">
                    <div onClick={() => this.props.handleClick("#e")}><span id="e">{String.fromCodePoint(252)}</span></div>
                    <div onClick={() => this.props.handleClick("#c")}><span id="c">{String.fromCodePoint(246)}</span></div>
                    <div onClick={() => this.props.handleClick("#u1")}><span id="u1">{String.fromCodePoint(223)}</span></div>
                    <div onClick={() => this.props.handleClick("#u2")}><span id="u2">{String.fromCodePoint(228)}</span></div>
                    <div onClick={() => this.props.handleClick("#u3")}><span id="u3">{String.fromCodePoint(233)}</span></div>
                  </div>
                  <div className="special-characters-numeric-verb">
                    <div className="special-characters-numeric">1</div>
                    <div className="special-characters-numeric">2</div>
                    <div className="special-characters-numeric">3</div>
                    <div className="special-characters-numeric">4</div>
                    <div className="special-characters-numeric">5</div>
                  </div>
                </div>
            );
        } else if(this.props.lang === 'french'){
            return (
                <div className="special-characters">
                  <div className="special-characters-clicks">
                    <div onClick={() => this.props.handleClick("#e")}><span id="e">{String.fromCodePoint(233)}</span></div>
                    <div onClick={() => this.props.handleClick("#c")}><span id="c">{String.fromCodePoint(231)}</span></div>
                    <div onClick={() => this.props.handleClick("#u1")}><span id="u1">{String.fromCodePoint(234)}</span></div>
                    <div onClick={() => this.props.handleClick("#u2")}><span id="u2">{String.fromCodePoint(249)}</span></div>
                  </div>
                  {/* <div className="special-characters-numeric-verb">
                    <div className="special-characters-numeric">1</div>
                    <div className="special-characters-numeric">2</div>
                    <div className="special-characters-numeric">3</div>
                    <div className="special-characters-numeric">4</div>
                  </div> */}
                  <div className="special-characters-numbers">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                  </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state){
    return {
        lang: state.lang
    };
}

export default connect(mapStateToProps)(SpecialCharacters);