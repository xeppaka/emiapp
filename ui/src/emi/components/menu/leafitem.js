import React, { PropTypes } from 'react';

const LeafItem = ({depth, text}) => {
    var style = {"padding-left": depth * 15};
    return (
        <a href="#test" className="list-group-item list-group-item-action" style={style}>{text}</a>
    )
};

export default LeafItem;