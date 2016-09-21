import React, { PropTypes } from 'react';

const MenuItem = ({depth, text, items}) => {
    var style = {"paddingLeft": depth * 15};

    if (items.length === 0) {
            return (<a href="#" style={style}>{text}</a>)
    } else {
            return (<ul style={style}>
                        <li><a href="#" style={style}>{text}</a></li>
                        {
                            items.map(function(elem) {
                                return (<MenuItem depth={depth + 1} text={elem.text} items={elem.items} />)
                            })
                        }
                    </ul>)
    }
};

export default MenuItem;