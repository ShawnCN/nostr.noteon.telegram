/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
