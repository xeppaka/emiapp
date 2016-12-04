import React, { PropTypes } from 'react';
import SaveCategoriesTableRow from './savecategoriestablerow';

class SaveCategoriesTable extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCategories(categories) {
        let categoryItems = [];

        for (let i = 0; i < categoryItems.length; i++) {
            let category = categories[i];

            categoryItems.push(<SaveCategoriesTableRow
                key={category.productId}
                idx={i + 1}
                category={category}
            />)
        }

        return categoryItems;
    }

    render() {
        return (
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th style={{width:'33%'}}>Category Name</th>
                    <th style={{width:'13%'}}>Parent Category Name</th>
                    <th style={{width:'13%'}}>Weight</th>
                </tr>
                </thead>
                <tbody>
                { this.renderCategories(this.props.categories) }
                </tbody>
            </table>
        )
    }
}

export default SaveCategoriesTable;