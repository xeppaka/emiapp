import React, { PropTypes } from 'react';
import CompItem from './compitem';

const menu = {
    text: 'Test 1',
    children: [
        {
            text: 'test 2'
        },
        {
            text: 'test 2'
        },
        {
            text: 'test 2'
        },
        {
            text: 'test 2'
        }
    ]
};

const ProductsMenu = () => {
    return <CompItem depth={0} text={menu.text} children={menu.children} />
};

export default ProductsMenu;