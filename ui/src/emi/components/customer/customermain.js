import React, { PropTypes } from 'react';

import ProductsTotalContainer from '../../containers/productstotalcontainer';
import ProductsMenuContainer from '../../containers/productsmenucontainer';
import ProductsContainer from '../../containers/productscontainer';
import ModalsContainer from '../../containers/modalscontainer';

class CustomerMain extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.bootstrapCustomer();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 nopadding">
                        <ProductsMenuContainer />
                    </div>
                    <div className="col-sm-9">
                        <ProductsContainer />
                    </div>
                </div>
                <ProductsTotalContainer />
                <ModalsContainer />
            </div>
        )
    }
}

export default CustomerMain;
