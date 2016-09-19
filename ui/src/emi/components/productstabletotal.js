import React, { PropTypes } from 'react';

class ProductsTableTotal extends React.Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {scrollTop: 40};
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        let scrollTop = event.srcElement.body.scrollTop;
        this.setState({
            scrollTop: scrollTop + 40
        });
    }

    render() {
        return (
                    <div className="card" style={{marginTop: this.state.scrollTop}}>
                        <div className="card-block">
                            <h4 className="card-title">Total:</h4>
                            <p className="card-text">Without VAT: {this.props.total.toFixed(2)}&#8364;</p>
                            <a href="#" className="btn btn-primary">Reset</a>
                        </div>
                    </div>
               )
    }
}

//ProductItem.propTypes = {
//    name: PropTypes.string.isRequired
//};

export default ProductsTableTotal;