import React, { PropTypes } from 'react';

class AdminTabs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" href="#">Products</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Categories</a>
                </li>
            </ul>
        )
    }
}

export default AdminTabs;