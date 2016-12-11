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
        let active = this.props.active;
        let activateLastWithValue = this.props.activateLastWithValue;

        if (expanded) {
            return (
                    <li>
                        <a className={'expanded' + (active ? ' active' : '')} href={'#' + nodeId} onClick={() => this.menuItemClicked(nodeId)}>{text}</a>
                        <ul>
                            {
                                items.map((elem, idx) => {
                                        let nextExpanded = false;
                                        let nextActive = false;
                                        let nextActivateLastWithValue = activateLastWithValue;
                                        if ((depth + 1) < selectedNodeId.length) {
                                            nextExpanded = Number(selectedNodeId[depth + 1]) === idx && elem.items.length > 0;
                                        } else {
                                            nextExpanded = idx === 0 && !elem.hasValue && elem.items.length > 0;
                                        }

                                        if (!active) {
                                            if ((depth + 2 === selectedNodeId.length) && Number(selectedNodeId[depth + 1]) === idx) {
                                                if (elem.hasValue) {
                                                    nextActive = true;
                                                } else {
                                                    nextActivateLastWithValue = true;
                                                }
                                            }

                                            if (activateLastWithValue && idx === 0 && elem.hasValue) {
                                                nextActive = true;
                                                nextActivateLastWithValue = false;
                                            }
                                        }

                                        return <MenuItem key={elem.id} expanded={nextExpanded} active={nextActive} activateLastWithValue={nextActivateLastWithValue}
                                                         depth={depth + 1} menuItem={elem} selectedNodeId={selectedNodeId} onMenuNodeSelected={this.props.onMenuNodeSelected} />
                                    }
                                )
                            }
                        </ul>
                    </li>
                   )
        } else {
            return (<li><a className={active ? 'active' : ''} href={'#' + nodeId} onClick={() => this.menuItemClicked(nodeId)}>{text}</a></li>)
        }
    }
}

export default MenuItem;