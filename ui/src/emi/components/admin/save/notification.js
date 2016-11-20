import React, { PropTypes } from 'react';

class Notification extends React.Component {
    constructor(props) {
        super(props);
    }

    onSendNotificationChanged(event) {
        this.props.setSendNotification(event.target.checked);
    }

    onNotificationChanged(event) {
        this.props.setNotificationText(event.target.value);
    }

    render() {
        let notification = this.props.notification;

        return (
            <div>
                <div className='form-group has-warning'>
                    <label className='form-check-label'>
                        <input type='checkbox' className='form-check-input' checked={notification.sendNotification}
                               onChange={(event) => this.onSendNotificationChanged(event)} />Send notification to customers
                    </label>
                </div>
                {
                    notification.sendNotification ?
                        (<div className='form-group'>
                            <textarea className='form-control'
                                      value={notification.text}
                                      onChange={(event) => this.onNotificationChanged(event)}
                                      rows='3'/>
                        </div>) : null
                }
            </div>
        )
    }
}

export default Notification;