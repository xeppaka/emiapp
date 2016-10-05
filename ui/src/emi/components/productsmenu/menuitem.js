import React, { PropTypes } from 'react';

class MenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    menuItemClicked(nodeId) {
        this.props.onMenuNodeSelected(nodeId);
    }

    render() {
        let nodeId = this.props.menuItem.id;
        let text = this.props.menuItem.text;
        let items = this.props.menuItem.items;
        let selectedNodeId = this.props.selectedNodeId;
        let depth = this.props.depth;
        let expanded = this.props.expanded;

        if (expanded) {
            return (
                    <li>
                        <a className='expanded' href={'#' + nodeId} onClick={() => this.menuItemClicked(nodeId)}>{text}</a>
                        <ul>
                            {
                                items.map((elem, idx) => {
                                        let expanded = false;
                                        let active = false;
                                        if ((depth + 1) < selectedNodeId.length) {
                                            expanded = Number(selectedNodeId[depth + 1]) === idx && elem.items.length > 0;
                                        } else {
                                            expanded = idx === 0 && !elem.hasValue && elem.items.length > 0;
                                        }

                                        return <MenuItem key={elem.id} expanded={expanded} active={active}
                                                         depth={depth + 1} menuItem={elem} selectedNodeId={selectedNodeId} onMenuNodeSelected={this.props.onMenuNodeSelected} />
                                    }
                                )
                            }
                        </ul>
                    </li>
                   )
        } else {
            return (<li><a className={this.props.active ? 'active' : ''} href={'#' + nodeId} onClick={() => this.menuItemClicked(nodeId)}>{text}</a></li>)
        }
    }
};

export default MenuItem;