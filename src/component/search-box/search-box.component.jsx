import React from 'react';

import './search-box.styles.css';

export const SearchBox = ({placeholder,handleChange}) => (
    <input className="search" 
    type='search' placeholder={placeholder}  //placeholder可以reuesable了
    onChange={handleChange}/>   //同样使得onChange可以reusable,不管在什么时候，input的标签的onChange属性永远叫onChange
)