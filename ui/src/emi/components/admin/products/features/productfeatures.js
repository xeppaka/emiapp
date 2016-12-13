import React, { PropTypes } from 'react';
import ProductFeature from './productfeature';

class ProductFeatures extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        let features = this.props.features;
        let isFlammable = features.indexOf('FLAMMABLE') >= 0;
        let isNew = features.indexOf('NEW') >= 0;
        let isVisible = features.indexOf('VISIBLE') >= 0;
        let isAvailable = features.indexOf('AVAILABLE') >= 0;

        return (
            <div>
                <ProductFeature
                    name='F' enabled={isFlammable}
                    onChange={(enabled) => this.props.onProductFeatureChanged('FLAMMABLE', enabled)}
                />
                <ProductFeature
                    name='N' enabled={isNew}
                    onChange={(enabled) => this.props.onProductFeatureChanged('NEW', enabled)}
                />
                <ProductFeature
                    name='V' enabled={isVisible}
                    onChange={(enabled) => this.props.onProductFeatureChanged('VISIBLE', enabled)}
                />
                <ProductFeature
                    name='A' enabled={isAvailable}
                    onChange={(enabled) => this.props.onProductFeatureChanged('AVAILABLE', enabled)}
                />
            </div>
        )
    }
}

export default ProductFeatures;