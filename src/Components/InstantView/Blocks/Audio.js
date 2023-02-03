

import React from 'react';
import PropTypes from 'prop-types';
import MediaAudio from '../../Message/Media/Audio';
import Caption from './Caption';

function Audio(props) {
    const { audio, block, caption, openMedia } = props;

    return (
        <figure>
            <MediaAudio block={block} audio={audio} openMedia={openMedia} />
            <Caption text={caption.text} credit={caption.credit} />
        </figure>
    );
}

Audio.propTypes = {
    block: PropTypes.object.isRequired,
    audio: PropTypes.object,
    caption: PropTypes.object.isRequired,
    openMedia: PropTypes.func
};

export default Audio;
