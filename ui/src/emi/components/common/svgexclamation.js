import React, { PropTypes } from 'react';

class SvgExclamation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 16 16' style={{fill: '#e72626'}}>
                <path d='M8.865 1.52c-.18-.31-.51-.5-.87-.5s-.69.19-.87.5L.275 13.5c-.18.31-.18.69 0 1 .19.31.52.5.87.5h13.7c.36 0 .69-.19.86-.5.17-.31.18-.69.01-1L8.865 1.52zM8.995 13h-2v-2h2v2zm0-3h-2V6h2v4z' />
            </svg>
        )
    }
}

export default SvgExclamation;