import React from 'react';

import './card.styles.css';

// 在url中插入变量需要用{`url + ${变量}`}
export const Card = props => (
    <div className='card-container'>
        <img alt="monster" src={`https://robohash.org/${props.monster.id}?set=set2`}/>   
        <h2>{props.monster.name}</h2>
        <p>{props.monster.email}</p>
    </div>
)

