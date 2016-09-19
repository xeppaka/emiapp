import React, { PropTypes } from 'react';
import CompItem from './compitem';

let menu = {
    text: 'Test 1',
    children: [],
};

const ProductsMenu = () => {
    return (
        <CompItem depth={0} text={menu.text} children={menu.children} />
    )
};

export default ProductsMenu;