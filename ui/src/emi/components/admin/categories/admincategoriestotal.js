import React from 'react';

class AdminCategoriesTotal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className='navbar fixed-bottom navbar-toggleable-sm navbar-inverse bg-inverse'>
                <ul className='navbar-nav mr-auto' />
                <ul className='navbar-nav'>
                    <li className='nav-item'><a className='nav-link active'>Created Categories: <span style={{fontSize: '120%'}}>{this.props.createdCategories}</span></a></li>
                    <li className='nav-item'><a className='nav-link active'>Deleted Categories: <span style={{fontSize: '120%'}}>{this.props.deletedCategories}</span></a></li>
                    <li className='nav-item'><a className='nav-link active'>Modified Categories: <span style={{fontSize: '120%'}}>{this.props.modifiedCategories}</span></a></li>
                    <li className='nav-item' style={{marginRight: '10px'}}><button type='button' className='btn btn-secondary'
                                                     onClick={this.props.onResetCategories}>Reset</button></li>
                    <li className='nav-item'><button type='button' disabled={!this.props.canSave} className='btn btn-primary'
                                                     onClick={this.props.onSaveCategories}>Save&hellip;</button></li>
                </ul>
            </nav>
        )
    }
}

export default AdminCategoriesTotal;
