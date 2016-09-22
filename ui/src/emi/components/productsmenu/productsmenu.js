import React, { PropTypes } from 'react';
import MenuItem from './menuitem';

const ProductsMenu = ({menu, menuNodeToggled}) => {
    return <MenuItem depth={0} menuItem={menu} menuNodeToggled={menuNodeToggled} />
};

export default ProductsMenu;