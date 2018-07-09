import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPlural, setCorrectAndFetch } from './../../../actions';
import PluralInput from './plural_input';
import HandleSpecial from './../../hoc_special';

class Plural extends Component {
    componentWillMount(){
        this.props.fetchPlural();
    }
    componentDidMount(){
        document.querySelector('.app').classList.add('bg-verb');
    }
    componentWillUnmount(){
        document.querySelector('.app').classList.remove('bg-verb')
    }
    displayPlural(){
        if(!this.props.plural){
            return <div className="loader"></div>;
        } else {
            const Composed = HandleSpecial(PluralInput);            
            const noun = this.props.plural;
            return (
                <div className="card-content">
                    <div className="plural-header">
                        <div className="plural-noun">{noun.article} {noun.word}</div>
                        <div>{noun.meaning}</div>
                    </div>
                    <Composed handleCorrect={this.handleCorrect.bind(this)} correct={this.props.plural.plural} />
                    <div className="hint-plural">Press the right keyboard arrow to see the answer</div>
                </div>
            );
        }
    }
    handleCorrect(){
        setTimeout(() => {
            this.props.setCorrectAndFetch('plural');
        }, 600);
    }
    render(){
        return (
            <div className="card-container bg-verb">
                {this.displayPlural()}
            </div>
        );
    } 
}

const mapStateToProps = state => {
    return {
        plural: state.plural
    };
}

export default connect(mapStateToProps, { fetchPlural, setCorrectAndFetch })(Plural);