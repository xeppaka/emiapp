import React, { PropTypes } from 'react';
import LeafMenuItem from './leafmenuitem';

const CompMenuItem = ({depth, text, items}) => {
    var style = {"padding-left": depth * 15};
    return (
        <div className="list-group" style={style}>
            <a href="#test" className="list-group-item list-group-item-action" style={style} data-toggle="collapse">{text}</a>
            <div id="test" className="list-group collapse">
            {
                items.map(function(elem) {
                    if (elem.hasOwnProperty("items")) {
                        return <CompMenuItem depth={depth + 1} text={elem.text} items={elem.items} />
                    } else {
                        return <LeafMenuItem depth={depth + 1} text={elem.text} />
                    }
                })
            }
            </div>
        </div>
    )
};

export default CompMenuItem;