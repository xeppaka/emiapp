import React, { PropTypes } from 'react';
import AdminProductsContainer from '../../containers/adminproductscontainer';

class AdminProductsTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <AdminProductsContainer />;
    }
}

export default AdminProductsTab;