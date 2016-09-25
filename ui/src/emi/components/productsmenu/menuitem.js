import React, { PropTypes } from 'react';

class MenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    menuItemClicked(id) {
        this.props.menuNodeToggled(id);
    }

    render() {
        let depth = this.props.depth;
        let id = this.props.menuItem.id;
        let text = this.props.menuItem.text;
        let items = this.props.menuItem.items;
        let expanded = this.props.menuItem.expanded;
        let menuNodeToggled = this.props.menuNodeToggled;
        let active = this.props.menuItem.hasOwnProperty('active') && this.props.menuItem.active;
        let style = {"paddingLeft": this.props.depth * 15};
        let linkClassName = 'nav-link' + (active ? ' active' : '');

        if (items.length === 0 || !expanded) {
                return (<li className='nav-item'><a style={style} className={linkClassName} href={'#' + id} onClick={() => this.menuItemClicked(id)}>{text}</a></li>)
        } else {
                return (<li className='nav-item'>
                            <a style={style} className={linkClassName} href={'#' + id} onClick={() => this.menuItemClicked(id)}>{text}</a>
                            <ul className='nav nav-pills nav-stacked'>
                                {
                                        items.map(function(elem) {
                                            return (<MenuItem depth={depth + 1} menuItem={elem} menuNodeToggled={menuNodeToggled} />)
                                        })
                                }
                            </ul>
                        </li>
                        )
        }
    }
};

export default MenuItem;