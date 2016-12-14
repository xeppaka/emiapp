import React, { PropTypes } from 'react';

class RootCategoryTableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let category = this.props.category;

        return (<tr>
            <td><input disabled type='text' className='form-control form-control-sm' value={category.name} /></td>
            <td><input disabled type='text' className='form-control form-control-sm' value={category.parentCategoryName} /></td>
            <td><input disabled type='number' className='form-control form-control-sm' min='0' value={0}/></td>
            <td></td>
        </tr>)
    }
}

export default RootCategoryTableRow;