import React, { useRef, useState } from 'react';

import { FaTimes } from 'react-icons/fa';
import MessageDisplay from '../../messageDisplay/messageDisplay.jsx';
import PasswordFields from '../passwordsFields/passwordsFields.jsx';

import './resetPassword.css';

let resetMsgId, passwordMsgId;

export default ResetPassword = (props) => {
    const [ isResettingPassword, setIsResettingPassword ] = useState(false);
    const [ password, setPassword ] = useState("");

    const messageDisplayRef = useRef(null);
    const passwordFieldsRef = useRef(null);

    function canReset() {
        if (!password)
            return false;

        return true;
    }

    function onFormSubmit(event) {
        event.preventDefault();

        const token = Session.get('passwordResetToken');

        setIsResettingPassword(true);
        Accounts.resetPassword(token, password, callback);

        const messageDisplay = messageDisplayRef.current;
        messageDisplay.hide(resetMsgId);

        function callback(error) {
            if (error)
                resetMsgId = messageDisplay.show('error', "Error resetting password, the link has expired.", resetMsgId);

            else
                resetMsgId = messageDisplay.show('success', "Password changed successfully.", resetMsgId);

            setIsResettingPassword(false);
        }

        Session.set('passwordResetToken', undefined);
    }

    function onPasswordChange(password) {
        const messageDisplay = messageDisplayRef.current;
        messageDisplay.hide(passwordMsgId);

        if (!password) {
            setPassword(null);
            passwordMsgId = messageDisplay.show('error', "The typed passwords do not match.", passwordMsgId);
        }

        else
            setPassword(password);
    }

    function onCloseClick() {
        if (props.onDone)
            props.onDone();
    }

    return (
        <form id="form-resetPassword" onSubmit={onFormSubmit}>
            <PasswordFields ref={passwordFieldsRef} onChange={onPasswordChange} />

            <MessageDisplay ref={messageDisplayRef} />

            <button id="btnReset" className="btn btn-primary btn-sm btn-block" type="submit" disabled={!canReset()}>
                {isResettingPassword ?
                    <div>Resetting password...</div> :
                    <div>Reset Password</div>
                }
            </button>

            <div id="blockClose">
                <button className="btn btn-danger btn-sm" onClick={onCloseClick}><FaTimes className="align-middle"/> Close</button>
            </div>
        </form>
    );
}