import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../actions/modalactions';
import Modals from '../components/modals/modals';

const mapStateToProps = (state) => {
    return {
        modals: state.modals.visibleModals
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideModal: (id) => dispatch(hideModal(id))
    }
}

const ModalsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Modals);

export default ModalsContainer;