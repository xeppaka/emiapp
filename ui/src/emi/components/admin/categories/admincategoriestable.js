import React, {PropTypes} from 'react';
import AdminCategoriesTableRow from './admincategoriestablerow';
import RootCategoryTableRow from './rootcategorytablerow';

class AdminCategoriesTable extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCategories(categoriesList) {
        let catList = [];

        catList.push(<RootCategoryTableRow key={categoriesList[0].categoryId} category={categoriesList[0]}/>);
        for (let i = 1; i < categoriesList.length; i++) {
            catList.push(<AdminCategoriesTableRow key={categoriesList[i].categoryId}
                                                  category={categoriesList[i]}
                                                  categoriesList={categoriesList}
                                                  onCategoryNameChanged={this.props.onCategoryNameChanged}
                                                  onCategoryWeightChanged={this.props.onCategoryWeightChanged}
                                                  onParentCategoryChanged={this.props.onParentCategoryChanged}
                                                  onDeleteCategory={this.props.onDeleteCategory}
            />);
        }

        return catList;
    }

    render() {
        return (
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th style={{width: '40%'}}>Category Name</th>
                    <th style={{width: '40%'}}>Parent Category Name</th>
                    <th style={{width: '15%'}}>Weight</th>
                    <th style={{width: '5%'}}>Action</th>
                </tr>
                </thead>
                <tbody>
                { this.renderCategories(this.props.categoriesList) }
                </tbody>
            </table>
        )
    }
}

export default AdminCategoriesTable;