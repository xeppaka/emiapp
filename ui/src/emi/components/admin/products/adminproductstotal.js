import React from 'react';

class AdminProductsTotal extends React.Component {
    constructor(props) {
        super(props);
    }

    onResetProductModifications() {
        this.props.onResetModifications();
    }

    onSaveProducts() {
        this.props.onSaveModifications();
    }

    render() {
        return (
            <nav className='navbar fixed-bottom navbar-toggleable-sm navbar-inverse bg-inverse'>
                <ul className='navbar-nav mr-auto' />
                <ul className='navbar-nav'>
                    <li className='nav-item'><a className='nav-link active'>Created Products: <span style={{fontSize: '120%'}}>{this.props.createdProducts}</span></a></li>
                    <li className='nav-item'><a className='nav-link active'>Deleted Products: <span style={{fontSize: '120%'}}>{this.props.deletedProducts}</span></a></li>
                    <li className='nav-item'><a className='nav-link active'>Modified Products: <span style={{fontSize: '120%'}}>{this.props.modifiedProducts}</span></a></li>
                    <li className='nav-item' style={{marginRight: '10px'}}><button type='button' className='btn btn-secondary'
                                                                                   onClick={(event) => this.onResetProductModifications()}>Reset</button></li>
                    <li className='nav-item'><button type='button' disabled={!this.props.canSave} className='btn btn-primary'
                                                     onClick={(event) => this.onSaveProducts()}>Save&hellip;</button></li>
                </ul>
            </nav>
        )
    }
}

export default AdminProductsTotal;
