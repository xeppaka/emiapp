import React, { PropTypes } from 'react';
import MenuItem from './menuitem';

const ProductsMenu = ({menu}) => {
    return <MenuItem depth={0} text={menu.text} items={menu.items} />
};

export default ProductsMenu;