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
        let divider1 = <span key='000'>|</span>;
        let divider2 = <span key='001'>|</span>;
        let divider3 = <span key='002'>|</span>;
        let visible = isVisible ? <span key='111'>VISIBLE</span> : <span key='111' style={{fontWeight: 'bold'}}>NOT VISIBLE</span>;
        let available = isAvailable ? <span key='222'>AVAILABLE</span> : <span key='222' style={{fontWeight: 'bold'}}>NOT AVAILABLE</span>;

        if (isNew) {
            components.push(<span key='333'>NEW</span>);
        }

        if (isFlammable) {
            if (components.length > 0) {
                components.push(divider1);
            }

            components.push(<span key='444'>FLAMMABLE</span>);
        }

        if (components.length > 0) {
            components.push(divider2)
        }
        components.push(visible);
        components.push(divider3);
        components.push(available);

        return (<span>{components}</span>);
    }
}

export default ProductFeaturesText;
