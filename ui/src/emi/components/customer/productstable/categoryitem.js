import React, { PropTypes } from 'react';

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr style={{backgroundColor: '#ff9fce'}}>
                <th scope='row'>
                    {
                        this.props.anchor.categoryAnchors.map((anchor) =>
                            <div key={anchor} id={anchor} /> )
                    }
                </th>
                <td colSpan={this.props.colspan}>{this.props.anchor.categoryNames.reduce((prevVal, curVal, idx) => {return idx === 0 ? curVal : prevVal + ' > ' + curVal}, '')}</td>
            </tr>
        )
    }
}

export default CategoryItem;