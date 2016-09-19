import React, { PropTypes } from 'react';

const LeafItem = ({depth, text}) => {
    var style = {"padding-left": depth * 15};
    return (
        <a className="list-group-item" style={style}>{text}</a>
    )
};

export default LeafItem;