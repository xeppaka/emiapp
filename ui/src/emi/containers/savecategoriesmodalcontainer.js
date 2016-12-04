import { connect } from 'react-redux';
import { saveCategories } from '../state/admin/adminactions';
import { modifiedCategoriesSelector } from '../state/selectors/adminselector';
import SaveCategoriesModal from '../components/admin/save/categories/savecategoriesmodal';

const mapStateToProps = (state) => {
    return {
        categories: modifiedCategoriesSelector(state),
        saving: state.admin.saving
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (saveModalId) => dispatch(saveCategories(saveModalId))
    }
};

const SaveCategoriesModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveCategoriesModal);

export default SaveCategoriesModalContainer;