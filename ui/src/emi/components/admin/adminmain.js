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
                <nav className='navbar navbar-light bg-faded'>
                    <ul className='nav navbar-nav'>
                        <li className='nav-item'>
                            <Link className={'nav-link'} to={'/admin/products'}>Products</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className={'nav-link'} to={'/admin/categories'}>Categories</Link>
                        </li>
                        <button className='btn btn-primary float-xs-right' onClick={this.props.onLogout}>Logout</button>
                    </ul>
                </nav>
                <ModalsContainer />
                { this.props.children }
            </div>
        )
    }
}

export default AdminMain;