import React, { PropTypes } from 'react';

class SvgFlame extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <svg xmlns='http://www.w3.org/2000/svg' width={this.props.width} height={this.props.height} viewBox='0 -5 20 20' style={{fill: '#e72626'}}>
                <path d='M5.05,0.31 C5.86,2.48 5.46,3.69 4.53,4.62 C3.55,5.67 1.98,6.45 0.9,7.98 C-0.55,10.03 -0.8,14.51 4.43,15.68 C2.23,14.52 1.76,11.16 4.13,9.07 C3.52,11.1 4.66,12.4 6.07,11.93 C7.46,11.46 8.37,12.46 8.34,13.6 C8.32,14.38 8.03,15.04 7.21,15.41 C10.63,14.82 11.99,11.99 11.99,9.85 C11.99,7.01 9.46,6.63 10.74,4.24 C9.22,4.37 8.71,5.37 8.85,6.99 C8.94,8.07 7.83,8.79 6.99,8.32 C6.32,7.91 6.33,7.13 6.93,6.54 C8.18,5.31 8.68,2.45 5.05,0.32 L5.03,0.3 L5.05,0.31 Z' />
            </svg>
        )
    }
}

export default SvgFlame;