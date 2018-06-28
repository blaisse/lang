import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RightMenu from './right_menu';
import { connect } from 'react-redux';
import { pushContent } from './../../actions';
import {  setPrivateMessages,
    fullChatConnected, fullChatNotificationClear,
    fullChatOldNotification,fullChatNotification } from '../fullchat/chatActions';

const links2 = {
    home: { link: '/', text: 'Change language', class: 'active-link', default: '' },
    tenses: { link: '/tenses', text: 'Tenses', class: 'link-tenses', default: '' },
    verb: { link: '/verb', text: 'Verbs', class: 'link-verb', default: '' },
    noun: { link: '/noun', text: 'Nouns', class: 'link-noun', default: '' },
    flashcards: { link: '/flashcards', text: 'Flashcards', class: 'active-link', default: '' },
    plural: { link: '/plural', text: 'Plural', class: 'link-verb', default: '' },
    blocks: { link: '/blocks', text: 'Blocks', class: 'link-noun', default: '' },
    chat: { link: '/chat', text: 'Chat', class: 'active-link', default: '' },
    panel: { link: '/panel', text: 'Panel', class: 'link-verb', default: 'panel-click' }
};

class Menu extends Component {
    state = { open: false, active: null };
    componentWillMount(){
        this.setState({ active: window.location.pathname });
    }
    //Close menu on item click, it's needed on mobile, not sure whether it should be kept on desktop
    closeMenu = () => this.setState({ open: false }, () => this.props.pushContent(this.state.open));
    cancelContentPush(){
        if(window.location.pathname === "/") return true;
        if(window.location.pathname === "/chat") return true;
        if(window.location.pathname === "/createflashcard") return true;
    }
    handleClick = () => {
        if(this.state.open){
            this.setState({ open: false }, () => {
                if(this.cancelContentPush()) return;
                this.props.pushContent(this.state.open);
            });
        } else {
            this.setState({ open: true }, () => {
                if(this.cancelContentPush()) return;
                this.props.pushContent(this.state.open);
            });
        }
    }
    renderSign(){
        if(this.props.authenticated) return <div className="menu-container-out"><Link to="/signout">Sign Out</Link></div>;
        return (
            <div className="menu-container-out">
                <Link to="signin" key="1">Sign In</Link>
                <Link to="signup" key="2">Sign Up</Link>
            </div>
        );
    }
    setActive = link => () => this.setState({ active: link });
    renderLinks(){
        return Object.keys(links2).map((key, i) => {
            const link = links2[key];
            const css = (this.state.active === link.link ? link.class : '') + ' ' + link.default;
            return <Link key={i} to={link.link} onClick={this.setActive(link.link)} className={css}>{link.text}</Link>;
        });
    }
    render(){
        return (
            <div className="menu-container">
                <div className="menu-container-logo">
                    <span className="menu-container-logo-span">
                        <strong>
                            <span className={(this.props.lang==='french' ? "lang-french-logo" : "")}>French</span> & <span className={(this.props.lang==='german' ? "lang-german-logo" : "")}>German</span>
                        </strong>
                    </span>
                </div>
                <div className="menu-container-links">{this.renderLinks()}</div>
                {this.renderSign()}
                <div className={"menu-icon " + (this.props.push ? 'menu-icon-close' : '')} onClick={this.handleClick}><div className="menu-icon-middle"></div></div>
                <RightMenu open={this.state.open} closeMenu={this.closeMenu}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        push: state.pushContent,
        authenticated: state.auth.authenticated,
        lang: state.lang,
    };
}

export default connect(mapStateToProps, { pushContent, setPrivateMessages, fullChatConnected,
    fullChatNotificationClear,
    fullChatOldNotification,
    fullChatNotification
})(Menu);