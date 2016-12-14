import { connect } from 'react-redux';
import CategoriesTable from '../components/admin/admincategoriestab';
import { adminCategoriesListSelector, adminCategoryCountersSelector } from '../state/selectors/admin/admincategoriesselector';
import { setCategoryName, setCategoryWeight, setCategoryParentId } from '../state/admin/adminactions';
import { showSaveCategoriesModal } from '../state/modals/modalsactions';
import { resetCategories, createCategory, deleteCategory } from '../state/admin/adminactions';

const mapStateToProps = (state) => {
    let counters = adminCategoryCountersSelector(state);

    return {
        categoriesList: adminCategoriesListSelector(state),
        createdCategories: counters.createdCategories,
        modifiedCategories: counters.modifiedCategories,
        deletedCategories: counters.deletedCategories,
        canSave: (counters.createdCategories + counters.modifiedCategories + counters.deletedCategories) > 0
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCategoryNameChanged: (categoryId, name) => dispatch(setCategoryName(categoryId, name)),
        onCategoryWeightChanged: (categoryId, weight) => dispatch(setCategoryWeight(categoryId, weight)),
        onParentCategoryChanged: (categoryId, parentCategoryId) =>
            dispatch(setCategoryParentId(categoryId, parentCategoryId)),
        onCreateCategory: () => dispatch(createCategory()),
        onDeleteCategory: (categoryId) => dispatch(deleteCategory(categoryId)),
        onResetCategories: () => dispatch(resetCategories()),
        onSaveCategories: () => dispatch(showSaveCategoriesModal())
    }
};

const AdminCategoriesTabContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoriesTable);

export default AdminCategoriesTabContainer;