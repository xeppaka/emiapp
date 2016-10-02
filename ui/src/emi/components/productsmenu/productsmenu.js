import React, { PropTypes } from 'react';
import MenuItem from './menuitem';
import './productsmenu.scss';

class ProductsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {scrollTop: 20};
    }

    componentDidMount() {
        // window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        // window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
//        let scrollTop = event.srcElement.body.scrollTop;
//        this.setState({
//            scrollTop: scrollTop + 20
//        });
    }

    render() {
        return (
            <div id='productsMenu' className='col-sm-3' style={{marginTop: this.state.scrollTop, position: 'fixed'}}>
                <ul><MenuItem depth={0} menuItem={this.props.menu} menuNodeToggled={this.props.menuNodeToggled} /></ul>
            </div>
            )
    }
}

export default ProductsMenu;