import React, { PropTypes } from 'react';

const LeafMenuItem = ({depth, text}) => {
    var style = {"padding-left": depth * 15};
    return (
        <a href="#product1" className="list-group-item list-group-item-action" style={style}>{text}</a>
    )
};

export default LeafMenuItem;