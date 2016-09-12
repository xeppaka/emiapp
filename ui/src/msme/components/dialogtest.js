import React from 'react';

class DialogTest extends React.Component {
    constructor(props) {
        super(props);

        this.test = this.test.bind(this);
    }

    test() {
        this.refs.dialog.showModal();
    }

    render() {
        return (
            <div>
                <button id="show-dialog" type="button" className="mdl-button" onClick={this.test}>Show Dialog</button>
                <dialog className="mdl-dialog" ref="dialog">
                    <h4 className="mdl-dialog__title">Allow data collection?</h4>
                    <div className="mdl-dialog__content">
                        <p>
                            Allowing us to collect data will let us get you the information you want faster.
                        </p>
                    </div>
                    <div className="mdl-dialog__actions">
                        <button type="button" className="mdl-button">Agree</button>
                        <button type="button" className="mdl-button close">Disagree</button>
                    </div>
                </dialog>
            </div>
        );
    }
}

export default DialogTest;