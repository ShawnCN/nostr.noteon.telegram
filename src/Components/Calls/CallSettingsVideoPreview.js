

import React from 'react';
import PropTypes from 'prop-types';
import './CallSettingsVideoPreview.css';

class CallSettingsVideoPreview extends React.Component {

    componentDidMount() {
        const { stream } = this.props;
        if (stream) {
            const video = document.getElementById('call-settings-video');
            if (video) {
                video.srcObject = stream;
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { stream } = this.props;
        if (prevProps.stream !== stream) {
            const video = document.getElementById('call-settings-video');
            if (video) {
                video.srcObject = stream;
            }
        }
    }

    componentWillUnmount() {
    }

    render() {

        return (
            <div>
                <video id='call-settings-video' autoPlay={true} muted={true}/>
            </div>
        );
    }

}

CallSettingsVideoPreview.propTypes = {
    stream: PropTypes.object
};

export default CallSettingsVideoPreview;