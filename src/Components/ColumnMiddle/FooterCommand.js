

import React from 'react';
import Button from '@material-ui/core/Button/Button';
import './FooterCommand.css';

class FooterCommand extends React.Component {
    render() {
        const { command, onCommand } = this.props;

        return (
            <div className='footer-command'>
                <div className='inputbox'>
                    <div className='inputbox-bubble'>
                        <Button color='primary' className='footer-command-button' onClick={onCommand}>
                            {command}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default FooterCommand;
