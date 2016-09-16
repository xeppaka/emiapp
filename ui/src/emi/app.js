import React from 'react';
import ProductTable from './components/producttable';

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
        <ProductTable />
    </div>
)

export default App;