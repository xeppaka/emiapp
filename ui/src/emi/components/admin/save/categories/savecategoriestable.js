import React, { PropTypes } from 'react';
import SaveCategoriesTableRow from './savecategoriestablerow';

class SaveCategoriesTable extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCategories(categories) {
        let categoryItems = [];

        for (let i = 0; i < categories.length; i++) {
            let category = categories[i];

            categoryItems.push(<SaveCategoriesTableRow
                key={category.categoryId}
                idx={i + 1}
                category={category}
            />)
        }

        return categoryItems;
    }

    render() {
        return (
            <table className='table table-striped table-sm'>
                <thead>
                <tr>
                    <th scope='row' style={{width:'46%'}}>Category Name</th>
                    <th style={{width:'27%'}}>Parent Category Name</th>
                    <th style={{width:'27%'}}>Weight</th>
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