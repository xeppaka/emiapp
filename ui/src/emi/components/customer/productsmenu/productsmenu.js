import React, { PropTypes } from 'react';
import MenuItem from './menuitem';
import './productsmenu.scss';

class ProductsMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.selectedNodeId !== nextProps.selectedNodeId)
            return true;

        return false;
    }

    render() {
        if (!this.props.menu.hasOwnProperty('id')) {
            return null;
        } else {
            let nextActivateLastWithValue = this.props.selectedNodeId.length === 1 && this.props.selectedNodeId[0] === '';

            return (
                <div id='productsMenu' className='col-sm-3' style={{position: 'fixed'}}>
                    <ul>
                        <MenuItem expanded={true} active={false} activateLastWithValue={nextActivateLastWithValue} depth={0}
                                  menuItem={this.props.menu} selectedNodeId={this.props.selectedNodeId} onMenuNodeSelected={this.props.onMenuNodeSelected} />
                    </ul>
                </div>
                )
        }
    }
}

export default ProductsMenu;