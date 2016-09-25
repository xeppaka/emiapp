import React, { PropTypes } from 'react';

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<tr className='table-info'>
            <th scope='row'>
                            {
                                this.props.categoryAnchors.map((anchor) =>
                                    <div id={anchor}></div> )
                            }
            </th>
            <td colSpan='4'>{this.props.categoryNames.reduce((prevVal, curVal, idx) => {return idx === 0 ? curVal : prevVal + ' > ' + curVal}, '')}</td>
        </tr>)
    }
}

export default CategoryItem;