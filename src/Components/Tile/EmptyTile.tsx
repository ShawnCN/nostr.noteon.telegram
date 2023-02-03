

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './EmptyTile.css';

interface IPropsEmptyTile {
  dialog?: any;
  small?: boolean;
  big?: boolean;
  style?: any;
}

function EmptyTile(props: IPropsEmptyTile) {
  const { dialog, small, big, style } = props;

  return (
    <div
      className={classNames(
        'chat-tile',
        { 'tile-dialog': dialog },
        { 'tile-small': small },
        { 'tile-big': big }
      )}
      style={style}
    />
  );
}

// EmptyTile.propTypes = {};

export default EmptyTile;
