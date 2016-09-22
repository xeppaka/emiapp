import React, { PropTypes } from 'react';
import MenuItem from './menuitem';

class ProductsMenu extends React.Component {
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
            <div style={{marginTop: this.state.scrollTop}}>
                <MenuItem depth={0} menuItem={this.props.menu} menuNodeToggled={this.props.menuNodeToggled} />
            </div>
            )
    }
}

export default ProductsMenu;