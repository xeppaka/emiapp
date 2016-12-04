import React, { PropTypes } from 'react';
import NameValueSelector from '../namevalueselector';

class CategoryTableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let category = this.props.category;
        let categoryNameIdList = this.props.categoriesList.map(
                (category) => { return { name: category.name, value: category.categoryId } }
            );

        return (<tr>
            <td><input type='text' className='form-control form-control-sm' value={category.name}
                       onChange={(event) => this.props.onCategoryNameChanged(category.categoryId, event.target.value)} />
            </td>
            <td><NameValueSelector currentValue={category.parentCategoryId}
                                   nameValueList={categoryNameIdList}
                                   onValueSelected={(parentCategoryId) => this.props.onParentCategoryChanged(category.categoryId, parentCategoryId)} />
            </td>
            <td>
                <input type='number' className='form-control form-control-sm' min='0' value={category.weight}
                       onChange={(event) => this.props.onCategoryWeightChanged(category.categoryId, Number(event.target.value))}/>
            </td>
        </tr>)
    }
}

export default CategoryTableRow;