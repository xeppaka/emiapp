import React, { PropTypes } from 'react';

class SaveCategoriesTableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let category = this.props.category;

        return (<tr>
            <td>{category.name}</td>
            <td>{category.parentCategoryName}</td>
            <td>{category.weight}</td>
        </tr>)
    }
}

export default SaveCategoriesTableRow;