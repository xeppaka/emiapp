import { connect } from 'react-redux';
import { selectMenuNode } from '../state/menu/menuactions';
import ProductsMenu from '../components/productsmenu/productsmenu';

const mapStateToProps = (state) => {
    return {
        menu: state.menu.menu,
        selectedNodeId: state.menu.selectedNodeId.split('.')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMenuNodeSelected: (nodeId) => dispatch(selectMenuNode(nodeId))
    }
}

const ProductsMenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsMenu);

export default ProductsMenuContainer;