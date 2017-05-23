import React, { PropTypes } from 'react';
import ProductFeatureBox from './productfeaturebox';

class ProductFeaturesBoxes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let features = this.props.features;
        let isFlammable = features.indexOf('FLAMMABLE') >= 0;
        let isNew = features.indexOf('NEW') >= 0;
        let isVisible = features.indexOf('VISIBLE') >= 0;
        let isAvailable = features.indexOf('AVAILABLE') >= 0;

        return (
            <div>
                <ProductFeatureBox
                    name='NEW' enabled={isNew}
                    onChange={(enabled) => this.props.onProductFeatureChanged('NEW', enabled)}
                />
                <span style={{marginRight: '7px'}} />
                <ProductFeatureBox
                    name='FLA' enabled={isFlammable}
                    onChange={(enabled) => this.props.onProductFeatureChanged('FLAMMABLE', enabled)}
                />
                <span style={{marginRight: '7px'}} />
                <ProductFeatureBox
                    name='VIS' enabled={isVisible}
                    onChange={(enabled) => this.props.onProductFeatureChanged('VISIBLE', enabled)}
                />
                <span style={{marginRight: '7px'}} />
                <ProductFeatureBox
                    name='AVA' enabled={isAvailable}
                    onChange={(enabled) => this.props.onProductFeatureChanged('AVAILABLE', enabled)}
                />
            </div>
        )
    }
}

export default ProductFeaturesBoxes;