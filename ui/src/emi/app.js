import React from 'react';
import ProductList from './components/productlist';

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return { }
}

const App = () => (
    <div>
        <ProductList />
    </div>
)

export default App;