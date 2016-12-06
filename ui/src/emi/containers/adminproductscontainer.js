import { connect } from 'react-redux';
import AdminProductsTable from '../components/admin/productstable/adminproductstable';
import { adminProductsSelector } from '../state/selectors/productsselector';
import { adminCategoriesListSelector } from '../state/selectors/adminselector';
import { setProductName, setProductPrice, setProductCategory } from '../state/admin/adminactions';

const mapStateToProps = (state) => {
    return {
        products: adminProductsSelector(state),
        categoriesList: adminCategoriesListSelector(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onProductNameChanged: (productId, name) => {
            dispatch(setProductName(productId, name));
        },
        onProductPriceChanged: (productId, price) => {
            dispatch(setProductPrice(productId, price));
        },
        onProductCategoryChanged: (productId, categoryId) => {
            dispatch(setProductCategory(productId, categoryId))
        }
    }
};

const AdminProductsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminProductsTable);

export default AdminProductsContainer;