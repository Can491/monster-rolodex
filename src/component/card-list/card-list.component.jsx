import React from 'react';

import { Card } from '../card/card.component' //加上括号就不会出现需要export default的情况了

import './card-list.styles.css';

//arrow function里永远就放props,需要用children,props.children可以在后面引用
export const CardList = props => (
    <div className="card-list">
        {
            props.monsters.map(monster => 
            <Card key={monster.id} monster={monster}/>) //这里需要传入的是整个monster,即使需要destructure也是在传入的component中进行
        }
    </div>
)