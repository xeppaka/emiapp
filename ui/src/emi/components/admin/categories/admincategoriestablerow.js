import React, { PropTypes } from 'react';
import NameValueSelector from '../../common/namevalueselector';

class AdminCategoriesTableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let category = this.props.category;
        let categoryNameIdList = this.props.categoriesList
            .filter(
                cat => category.categoryId !== cat.categoryId
            ).map(
                cat => { return { name: cat.name, value: cat.categoryId } }
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
            <td>
                <button type='button' className='btn btn-sm btn-secondary' onClick={() => this.props.onDeleteCategory(category.categoryId)}>Delete</button>
            </td>
        </tr>)
    }
}

export default AdminCategoriesTableRow;