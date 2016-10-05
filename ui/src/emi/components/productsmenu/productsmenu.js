import React, { PropTypes } from 'react';
import MenuItem from './menuitem';
import './productsmenu.scss';

class ProductsMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.menu.hasOwnProperty('id')) {
            return null;
        } else {
            return (
                <div id='productsMenu' className='col-sm-3' style={{position: 'fixed'}}>
                    <ul>
                        <MenuItem expanded={true} active={false} depth={0} menuItem={this.props.menu} selectedNodeId={this.props.selectedNodeId} onMenuNodeSelected={this.props.onMenuNodeSelected} />
                    </ul>
                </div>
                )
        }
    }
}

export default ProductsMenu;