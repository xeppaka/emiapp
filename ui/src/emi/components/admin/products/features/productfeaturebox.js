import React, { PropTypes } from 'react';

class ProductFeature extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let name = this.props.name;
        let enabled = this.props.enabled;

        return (
            <label className='form-check-label' onClick={(event) => event.stopPropagation()}>
                <input checked={enabled} type='checkbox' className='form-check-input'
                       onChange={(event) => this.props.onChange(event.target.checked)}
                       onClick={(event) => event.stopPropagation()}
                />{name}
            </label>
        )
    }
}

export default ProductFeature;