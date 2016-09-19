import React, { PropTypes } from 'react';
import LeafItem from './leafitem';

const CompItem = ({depth, text, children}) => {
    var style = {"padding-left": depth * 15};
    return (
        <div className="list-group" style={style}>
            <a id="test" href="#test" className="list-group-item list-group-item-action" style={style} data-toggle="collapse">{text}</a>
            {
                children.map(function(elem) {
                    if (elem.hasOwnProperty("children")) {
                        return <CompItem depth={depth + 1} text={elem.text} children={elem.children} />
                    } else {
                        return <LeafItem depth={depth + 1} text={elem.text} />
                    }
                })
            }
        </div>
    )
};

export default CompItem;