import React, { PropTypes } from 'react';
import OrderProductsTable from './orderproductstable';

class OrderModal extends React.Component {
    constructor(props) {
        super(props);
    }

    onCancel(event) {
        this.props.onHideModal();
    }

    onSubmit(event) {
        this.props.onSubmitOrder(this.props.modalId);
    }

    onEmailChanged(event) {
        this.props.onEmailChanged(event.target.value);
    }

    onCountryChanged(event) {
        this.props.onCountryChanged(event.target.value);
    }

    render() {
        let style = {display: 'block', zIndex: this.props.zIndex + 1};
        let modalHeight = $(window).height() * 0.55;
        let modalWidth = $(window).width() * 0.8;
        let divFeedbackClass = this.props.order.emailValid ? 'has-success' : 'has-danger';
        let inputFeedbackClass = this.props.order.emailValid ? 'form-control-success' : 'form-control-danger';

        return (
                 <div>
                    <div className='modal fade show' style={style}>
                      <div className='modal-dialog' role='document' style={{maxWidth: modalWidth + 'px'}}>
                        <div className='modal-content'>
                          <div className='modal-header'>
                            <button type='button' className='close' aria-label='Close' onClick={(event) => this.onCancel(event)}>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                            <h4 className='modal-title'>Create order</h4>
                          </div>
                          <div className='modal-body'>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <form className='form-inline'>
                                      <div className={`form-group ${divFeedbackClass}`}>
                                        <label htmlFor='customerEmail'>Email:&nbsp;</label>
                                        <input id='customerEmail' type='email'
                                               className={`form-control ${inputFeedbackClass}`}
                                               placeholder='email@mail.com'
                                               value={this.props.order.email}
                                               onChange={(event) => this.onEmailChanged(event)}>
                                        </input>
                                      </div>
                                      <div className='form-group'>
                                        <label htmlFor='customerCountry'>&nbsp;&nbsp;Country:&nbsp;</label>
                                        <select value={this.props.order.country} className='form-control' id='customerCountry' onChange={(event) => this.onCountryChanged(event)}>
                                          <option value='CZ'>Czech Republic</option>
                                          <option value='IT'>Italy</option>
                                          <option value='SP'>Spain</option>
                                          <option value='IR'>Ireland</option>
                                          <option value='FI'>Finland</option>
                                        </select>
                                      </div>
                                      </form>
                                </div>
                                <div className='row' style={{maxHeight: modalHeight + 'px', overflowY: 'auto', marginTop: '7px'}}>
                                    <OrderProductsTable products={ this.props.order.products } />
                                </div>
                                <div className='row'>
                                    <nav className='navbar'>
                                        <ul className='nav navbar-nav pull-xs-right'>
                                            <li className='nav-item'><a className='nav-link active'>Total without discount: <span style={{fontSize: '120%'}}>{Number((this.props.order.totalWithoutDiscount / 100).toFixed(2))}&#8364;</span></a></li>
                                            <li className='nav-item'><a className='nav-link active'>Total with discount: <span style={{fontWeight: 'bold', fontSize: '120%'}}>{Number((this.props.order.totalWithDiscount / 100).toFixed(2))}&#8364;</span></a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                          </div>
                          <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary btn-sm' onClick={(event) => this.onCancel(event)}>Cancel</button>
                            <span>&nbsp;&nbsp;</span>
                            <button type='button' className={`btn btn-primary`} disabled={!this.props.order.canSubmit} onClick={(event) => this.onSubmit(event)}>{this.props.order.submitting ? 'Submitting...' : 'Submit'}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='modal-backdrop fade show' style={{zIndex: this.props.zIndex}}></div>
                 </div>
               )
    }
}

export default OrderModal;