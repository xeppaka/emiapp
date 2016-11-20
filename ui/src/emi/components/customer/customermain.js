import React, { PropTypes } from 'react';

import ProductsTotalContainer from '../../containers/productstotalcontainer';
import ProductsMenuContainer from '../../containers/productsmenucontainer';
import ProductsContainer from '../../containers/productscontainer';
import ModalsContainer from '../../containers/modalscontainer';

class CustomerMain extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="container-fluid">
            <ProductsTotalContainer />
            <div className="row">
                <div className="col-sm-3 nopadding">
                    <ProductsMenuContainer />
                </div>
                <div className="col-sm-9">
                    <ProductsContainer />
                </div>
            </div>
            <ModalsContainer />
        </div>)
    }
}

export default CustomerMain;