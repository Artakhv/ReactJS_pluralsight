import React, { Component } from 'react';
import './App.css';


class Card extends Component {
    render() {
        const profile = this.props;
        return (
            <div className="github-profile">
                <div>
                <img src={profile.avatar_url} alt="pic" />
                </div>
                <div className="info">
                    <div className="name">{profile.name}</div>
                    <div className="company">{profile.company}</div>
                </div>
            </div>
        );
    }
}

export default Card;
