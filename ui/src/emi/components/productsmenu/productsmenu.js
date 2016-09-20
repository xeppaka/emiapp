import React, { PropTypes } from 'react';
import CompMenuItem from './compmenuitem';

const ProductsMenu = ({menu}) => {
    console.log(menu);
    return <CompMenuItem depth={0} text={menu.text} items={menu.items} />
};

export default ProductsMenu;