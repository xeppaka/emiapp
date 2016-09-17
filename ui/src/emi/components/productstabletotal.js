import React, { PropTypes } from 'react';

class ProductsTableTotal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                   <div className="demo-card-event mdl-card mdl-shadow--2dp">
                     <div className="mdl-card__title mdl-card--expand">
                       <h5>Total: {this.props.total.toFixed(2)}&#8364;</h5>
                     </div>
                     <div className="mdl-card__actions mdl-card--border">
                       <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                         Reset
                       </a>
                       <div className="mdl-layout-spacer"></div>
                       <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                         Submit
                       </a>
                     </div>
                   </div>
               )
    }
}

//ProductItem.propTypes = {
//    name: PropTypes.string.isRequired
//};

export default ProductsTableTotal;