import React, { PropTypes } from 'react';
import AdminCategoriesTable from './categories/admincategoriestable';
import AdminCategoriesTotal from './categories/admincategoriestotal';

class AdminCategoriesTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button type='button' className='btn btn-primary' onClick={this.props.onCreateCategory}>New Category</button>
                <AdminCategoriesTable categoriesList={this.props.categoriesList}
                                      onCategoryNameChanged={this.props.onCategoryNameChanged}
                                      onCategoryWeightChanged={this.props.onCategoryWeightChanged}
                                      onParentCategoryChanged={this.props.onParentCategoryChanged}
                                      onDeleteCategory={this.props.onDeleteCategory}
                />
                <AdminCategoriesTotal createdCategories={this.props.createdCategories}
                                      modifiedCategories={this.props.modifiedCategories}
                                      deletedCategories={this.props.deletedCategories}
                                      canSave={this.props.canSave}
                                      onResetCategories={this.props.onResetCategories}
                                      onSaveCategories={this.props.onSaveCategories}
                />
            </div>
        )
    }
}

export default AdminCategoriesTab;