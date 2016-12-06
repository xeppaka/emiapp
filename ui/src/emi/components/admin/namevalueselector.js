import React, { PropTypes } from 'react';

class NameValueSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    onValueSelected(value) {
        this.props.onValueSelected(value);
    }

    static renderList(list) {
        let items = [];

        for (let i = 0; i < list.length; i++) {
            items.push(<option key={i} value={list[i].value}>{list[i].name}</option>);
        }

        return items;
    }

    render() {
        let currentValue = this.props.currentValue;
        let nameValueList = this.props.nameValueList;

        return (<select className='form-control form-control-sm' value={currentValue}
                    onChange={(event) => this.onValueSelected(event.target.value)}>
            {
                NameValueSelector.renderList(nameValueList)
            }
        </select>)
    }
}

export default NameValueSelector;