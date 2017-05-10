import { connect } from 'react-redux';
import AdminProductsTab from '../components/admin/adminproductstab';
import { adminProductListSelector, adminProductCountersSelector } from '../state/selectors/productsselector';
import { categoriesListSelector } from '../state/selectors/categoriesselector';
import { setProductName, setProductPrice, setProductCategory,
         setProductMultiplicity, setProductNote, setProductWeight,
         resetProducts, createProduct, deleteProduct, setProductFeature,
         setCurrentModifyingProduct, clearCurrentModifyingProduct
       } from '../state/admin/adminactions';
import { showSaveProductsModal } from '../state/modals/modalsactions';

const mapStateToProps = (state) => {
    let counters = adminProductCountersSelector(state);

    return {
        currentModifyingProductId: state.emiapp.admin.currentModifyingProductId,
        categoriesList: categoriesListSelector(state),
        productsList: adminProductListSelector(state),
        createdProducts: counters.createdProducts,
        deletedProducts: counters.deletedProducts,
        modifiedProducts: counters.modifiedProducts,
        canSave: (counters.createdProducts + counters.deletedProducts + counters.modifiedProducts) > 0
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
            dispatch(setProductCategory(productId, categoryId));
        },
        onProductMultiplicityChanged: (productId, multiplicity) => {
            dispatch(setProductMultiplicity(productId, multiplicity));
        },
        onProductNoteChanged: (productId, note) => {
            dispatch(setProductNote(productId, note));
        },
        onProductWeightChanged: (productId, weight) => {
            dispatch(setProductWeight(productId, weight));
        },
        onProductFeatureChanged: (productId, featureName, enabled) => {
            dispatch(setProductFeature(productId, featureName, enabled));
        },
        onResetModifications: () => {
            dispatch(resetProducts());
        },
        onSaveModifications: () => {
            dispatch(showSaveProductsModal());
        },
        onCreateProduct: () => {
            dispatch(createProduct());
        },
        onDeleteProduct: (productId) => {
            dispatch(deleteProduct(productId));
        },
        onSetCurrentModifyingProduct: (productId) => {
            dispatch(setCurrentModifyingProduct(productId));
        },
        onClearCurrentModifyingProduct: () => {
            dispatch(clearCurrentModifyingProduct());
        }
    }
};

const AdminProductsTabContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminProductsTab);

export default AdminProductsTabContainer;