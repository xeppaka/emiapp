import React, {PropTypes} from 'react';

class ProductFeaturesText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let features = this.props.features;
        let isNew = features.indexOf('NEW') >= 0;
        let isFlammable = features.indexOf('FLAMMABLE') >= 0;
        let isVisible = features.indexOf('VISIBLE') >= 0;
        let isAvailable = features.indexOf('AVAILABLE') >= 0;

        let components = [];
        let divider = <span>|</span>;
        let visible = isVisible ? <span>VISIBLE</span> : <span style={{fontWeight: 'bold'}}>NOT VISIBLE</span>;
        let available = isAvailable ? <span>AVAILABLE</span> : <span style={{fontWeight: 'bold'}}>NOT AVAILABLE</span>;

        if (isNew) {
            components.push(<span>NEW</span>);
        }

        if (isFlammable) {
            if (components.length > 0) {
                components.push(divider);
            }

            components.push(<span>FLAMMABLE</span>);
        }

        if (components.length > 0) {
            components.push(divider)
        }
        components.push(visible);
        components.push(divider);
        components.push(available);

        return (<span>{components}</span>);
    }
}

export default ProductFeaturesText;
