import React, { PropTypes } from 'react';

const MenuItem = ({depth, text, items}) => {
    var style = {"paddingLeft": depth * 15};

                        console.log(items);
    if (items.length === 0) {
            return (<a href={'#' + text.replace(' ', '_')} style={style} data-toggle="collapse">{text}</a>)
    } else {
            return (<ul style={style}>
                    <a href={'#' + text.replace(' ', '_')} style={style} data-toggle="collapse">{text}</a>
                    <div id={text.replace(' ', '_')} className="collapse">
                    {
                        items.map(function(elem) {
                                return
                                (
                                    <li>
                                        <MenuItem depth={depth + 1} text={elem.text} items={elem.items} />
                                    </li>
                                )
                        })
                    }
                    </div>
                </ul>)
    }
};

export default MenuItem;