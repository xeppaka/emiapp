import React, { PropTypes } from 'react';

import AdminTabs from './admintabs';
import AdminProductsTab from './adminproductstab';
import AdminTotalContainer from '../../containers/admintotalcontainer';
import ModalsContainer from '../../containers/modalscontainer';

class AdminMain extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                <AdminTotalContainer />
                <AdminTabs />
                <AdminProductsTab />
                <ModalsContainer />
            </div>
        )
    }
}

export default AdminMain;