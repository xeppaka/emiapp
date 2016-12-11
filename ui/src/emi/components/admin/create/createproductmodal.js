import React, {PropTypes} from "react";
import NameValueSelector from '../../common/namevalueselector';
import update from 'react-addons-update';

class CreateProductModal extends React.Component {
    constructor(props) {
        super(props);

        let categoryNameValueList = this.props.categoriesList.map((cat) => {
            return {
                name: cat.name,
                value: cat.categoryId
            }
        });

        this.state = {
            name: '',
            price: 0,
            categoryId: categoryNameValueList[0].value,
            weight: 0,
            categoryNameValueList: categoryNameValueList
        };

        this.onCreate = this.onCreate.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onNameChanged(name) {
        this.setState(update(this.state, {
            name: {$set: name}
        }));
    }

    onPriceChanged(price) {
        this.setState(update(this.state, {
            price: {$set: price}
        }));
    }

    onCategoryChanged(categoryId) {
        this.setState(update(this.state, {
            categoryId: {$set: categoryId}
        }));
    }

    onWeightChanged(weight) {
        this.setState(update(this.state, {
            weight: {$set: weight}
        }));
        this.updateCanCreate();
    }

    canCreate() {
        return this.state.name.length > 0;
    }

    getProduct() {
        let state = this.state;
        return {
            name: state.name,
            price: state.price,
            categoryId: state.categoryId,
            weight: state.weight
        };
    }

    onCancel(event) {
        this.props.onHideModal();
    }

    onCreate(event) {
        this.props.onCreate(this.props.modalId, this.getProduct());
    }

    render() {
        let style = {display: 'block', zIndex: this.props.zIndex + 1};
        let modalHeight = $(window).height() * 0.55;
        let modalWidth = $(window).width() * 0.8;

        return (
            <div>
                <div className='modal fade in' style={style}>
                    <div className='modal-dialog' role='document' style={{maxWidth: modalWidth + 'px'}}>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <button type='button' className='close' aria-label='Close' onClick={(event) => this.onCancel(event)}>
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                                <h4 className='modal-title'>New product</h4>
                            </div>
                            <div className='modal-body'>
                                <div className='container'>
                                    <form>
                                        <div className='form-group row'>
                                            <label htmlFor='cat-name-input'>Name</label>
                                            <input className='form-control' type='text' id='cat-name-input' value={this.state.name}
                                                   onChange={event => this.onNameChanged(event.target.value)} />
                                        </div>
                                        <div className='form-group row'>
                                            <label htmlFor='cat-category-select'>Category</label>
                                            <NameValueSelector id='cat-category-select'
                                                               nameValueList={this.state.categoryNameValueList}
                                                               currentValue={this.state.categoryId}
                                                               onValueSelected={categoryId => this.onCategoryChanged(categoryId)}
                                            />
                                        </div>
                                        <div className='form-group row'>
                                            <label htmlFor='cat-price-input'>Price</label>
                                            <input className='form-control' type='number' id='cat-price-input' min={0}
                                                   value={this.state.price} onChange={price => this.onPriceChanged(price)}
                                            />
                                        </div>
                                        <div className='form-group row'>
                                            <label htmlFor='cat-note-input'>Weight</label>
                                            <input className='form-control' type='text' id='cat-note-input'
                                                   value={this.state.price} onChange={price => this.onPriceChanged(price)}
                                            />
                                        </div>
                                        <div className='form-inline row'>
                                            <label className='form-check-label'>
                                                <input type='checkbox' className='form-check-input'/>Flammable
                                            </label>
                                            <label className='form-check-label'>
                                                <input type='checkbox' className='form-check-input'/>Available
                                            </label>
                                            <label className='form-check-label'>
                                                <input type='checkbox' className='form-check-input'/>Hidden
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-secondary btn-sm' onClick={this.onCancel}>Cancel</button>
                                <span>&nbsp;&nbsp;</span>
                                <button type='button' className='btn btn-primary' disabled={!this.canCreate()} onClick={this.onCreate}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='modal-backdrop fade in' style={{zIndex: this.props.zIndex}}></div>
            </div>
        )
    }
}

export default CreateProductModal;