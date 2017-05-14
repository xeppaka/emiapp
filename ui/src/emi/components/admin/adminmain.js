import React, { PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';
import AdminProductsTabContainer from '../../containers/adminproducttabcontainer';
import AdminCategoriesTabContainer from '../../containers/admincategorytabcontainer';
import ModalsContainer from '../../containers/modalscontainer';

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
                <nav className='navbar fixed-top navbar-toggleable-sm navbar-light bg-faded'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/admin/products'>Products</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/admin/categories'>Categories</Link>
                        </li>
                    </ul>
                    <ul className='navbar-nav'>
                        <button className='btn btn-sm btn-primary' onClick={this.props.onLogout}>Logout</button>
                    </ul>
                </nav>
                <div style={{paddingTop: '65px'}}>
                    <Route path='/admin/products' component={AdminProductsTabContainer}/>
                    <Route path='/admin/categories' component={AdminCategoriesTabContainer}/>
                </div>
                <ModalsContainer />
            </div>
        )
    }
}

export default AdminMain;
