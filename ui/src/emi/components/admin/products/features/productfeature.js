import React, { PropTypes } from 'react';

class ProductFeature extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        let name = this.props.name;
        let enabled = this.props.enabled;

        return (
            <label className='form-check-label'>
                <input checked={enabled} type='checkbox' className='form-check-input'
                       onChange={(event) => this.props.onChange(event.target.checked)} />{name}
            </label>
        )
    }
}

export default ProductFeature;