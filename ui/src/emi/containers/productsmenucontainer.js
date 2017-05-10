import { connect } from 'react-redux';
import { selectMenuNode } from '../state/menu/menuactions';
import { menuSelector } from '../state/selectors/menuselector';
import ProductsMenu from '../components/customer/productsmenu/productsmenu';

const mapStateToProps = (state) => {
    return {
        menu: menuSelector(state),
        selectedNodeId: state.emiapp.menu.selectedNodeId.split('.')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMenuNodeSelected: (nodeId) => dispatch(selectMenuNode(nodeId))
    }
};

const ProductsMenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsMenu);

export default ProductsMenuContainer;