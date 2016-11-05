import React, { PropTypes } from 'react';

import AdminTabs from './admintabs';

class AdminMain extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                <AdminTabs />
            </div>
        )
    }
}

export default AdminMain;