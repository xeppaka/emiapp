import React, {PropTypes} from 'react';
import CategoryTableRow from './categorytablerow';
import RootCategoryTableRow from './rootcategorytablerow';

class CategoriesTable extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCategories(categoriesList) {
        let catList = [];

        catList.push(<RootCategoryTableRow category={categoriesList[0]}/>);

        for (let i = 1; i < categoriesList.length; i++) {
            catList.push(<CategoryTableRow key={categoriesList[i].categoryId}
                                           category={categoriesList[i]}
                                           categoriesList={categoriesList}
                                           onCategoryNameChanged={this.props.onCategoryNameChanged}
                                           onCategoryWeightChanged={this.props.onCategoryWeightChanged}
                                           onParentCategoryChanged={this.props.onParentCategoryChanged}
            />);
        }

        return catList;
    }

    render() {
        return (
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th style={{width: '46%'}}>Category Name</th>
                    <th style={{width: '22%'}}>Parent Category Name</th>
                    <th style={{width: '22%'}}>Weight</th>
                </tr>
                </thead>
                <tbody>
                { this.renderCategories(this.props.categoriesList) }
                </tbody>
            </table>
        )
    }
}

export default CategoriesTable;