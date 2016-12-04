import React, { PropTypes } from 'react';
import AdminProductsContainer from '../../containers/adminproductscontainer';
import AdminProductsTotalContainer from '../../containers/adminproductstotalcontainer';

class AdminProductsTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AdminProductsContainer />
                <AdminProductsTotalContainer />
            </div>
        )
    }
}

export default AdminProductsTab;