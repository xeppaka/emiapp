import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ModalsContainer from '../../containers/modalscontainer';

class AdminMain extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ul className='nav nav-tabs'>
                    <li className='nav-item'>
                        <Link className={'nav-link'} to={'/admin/products'}>Products</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className={'nav-link'} to={'/admin/categories'}>Categories</Link>
                    </li>
                </ul>
                <ModalsContainer />
                { this.props.children }
            </div>
        )
    }
}

export default AdminMain;