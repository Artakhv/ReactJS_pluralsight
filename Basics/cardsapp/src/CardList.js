import React from 'react';
import Card from './Card';


const CardList = (props) => (
    <div>
        {props.profiles.map(profile=> <Card {...profile} key={profile.name} />)}
    </div>
)

export default CardList;