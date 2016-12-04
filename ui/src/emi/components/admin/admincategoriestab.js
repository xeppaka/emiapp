import React, { PropTypes } from 'react';
import AdminCategoriesContainer from '../../containers/admincategoriescontainer';
import AdminCategoriesTotalContainer from '../../containers/admincategoriestotalcontainer';

class AdminCategoriesTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AdminCategoriesContainer />
                <AdminCategoriesTotalContainer />
            </div>
        )
    }
}

export default AdminCategoriesTab;