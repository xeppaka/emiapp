import { connect } from 'react-redux';
import CategoriesTable from '../components/admin/categories/categoriestable';
import { adminCategoriesListSelector } from '../state/selectors/admin/admincategoriesselector';
import { setCategoryName, setCategoryWeight, setCategoryParentId } from '../state/admin/adminactions';

const mapStateToProps = (state) => {
    return {
        categoriesList: adminCategoriesListSelector(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCategoryNameChanged: (categoryId, name) => {
            dispatch(setCategoryName(categoryId, name));
        },
        onCategoryWeightChanged: (categoryId, weight) => {
            dispatch(setCategoryWeight(categoryId, weight));
        },
        onParentCategoryChanged: (categoryId, parentCategoryId) => {
            dispatch(setCategoryParentId(categoryId, parentCategoryId));
        }
    }
};

const AdminCategoriesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoriesTable);

export default AdminCategoriesContainer;