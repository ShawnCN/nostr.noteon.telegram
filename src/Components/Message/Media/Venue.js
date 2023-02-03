

import React from 'react';
import PropTypes from 'prop-types';
import Location from './Location';
import './Venue.css';

class Venue extends React.Component {
    render() {
        const { chatId, messageId, venue, openMedia, meta, title, caption } = this.props;
        if (!venue) return null;

        const { title: venueTitle, address, location } = venue;
        if (!location) return null;

        const { longitude, latitude } = location;
        const source = `https://maps.google.com/?q=${latitude},${longitude}`;

        return (
            <div className='venue'>
                <Location
                    type='venue'
                    chatId={chatId}
                    messageId={messageId}
                    location={location}
                    openMedia={openMedia}
                    title={title}
                    caption={caption}
                />
                <div className='venue-content'>
                    <a href={source} target='_blank' rel='noopener noreferrer'>
                        <div className='venue-title'>{venueTitle}</div>
                    </a>
                    <div className='venue-subtitle'>
                        {address}
                        {!caption && meta}
                    </div>
                </div>
            </div>
        );
    }
}

Venue.propTypes = {
    chatId: PropTypes.number.isRequired,
    messageId: PropTypes.number.isRequired,
    venue: PropTypes.object.isRequired,
    openMedia: PropTypes.func
};

export default Venue;
