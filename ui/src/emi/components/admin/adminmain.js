import React, { PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';
import AdminProductsTabContainer from '../../containers/adminproducttabcontainer';
import AdminCategoriesTabContainer from '../../containers/admincategorytabcontainer';

class AdminMain extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.bootstrapAdmin();
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
                <Route path="/admin/products" component={AdminProductsTabContainer}/>
                <Route path="/admin/categories" component={AdminCategoriesTabContainer}/>
            </div>
        )
    }
}

export default AdminMain;
