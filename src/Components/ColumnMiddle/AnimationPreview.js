

import React from 'react';
import PropTypes from 'prop-types';
import Animation from '../Message/Media/Animation';
import './StickerPreview.css';

class AnimationPreview extends React.Component {
    render() {
        const { animation } = this.props;
        if (!animation) return null;

        return (
            <div className='sticker-preview'>
                <Animation
                    type='preview'
                    stretch={true}
                    animation={animation}
                    style={{ borderRadius: 0 }}
                />
            </div>
        );
    }
}

AnimationPreview.propTypes = {
    animation: PropTypes.object
};

export default AnimationPreview;
