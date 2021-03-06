import { connect } from 'react-redux';
import CreateProductModal from '../components/admin/create/createproductmodal';
import { categoryListSelector } from '../state/selectors/categoriesselector';
import { createProduct } from '../state/admin/adminactions';

const mapStateToProps = (state) => {
    return {
        categoriesList: categoryListSelector(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCreate: (modalId, product) => dispatch(createProduct(modalId, product))
    }
};

const CreateProductModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateProductModal);

export default CreateProductModalContainer;