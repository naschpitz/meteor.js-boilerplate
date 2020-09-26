import React, { useRef, useState } from 'react';
import { Meteor } from 'meteor/meteor';

import { FaTimes } from 'react-icons/fa';
import MessageDisplay from '../../messageDisplay/messageDisplay.jsx';
import PasswordFields from '../passwordsFields/passwordsFields.jsx';

import './changePassword.css';

let changeMsgId, passwordMsgId;

export default ChangePassword = (props) => {
    const [ isChangingPassword, setIsChangingPassword ] = useState(false);
    const [ password, setPassword ] = useState("");

    const messageDisplayRef = useRef(null);
    const oldPasswordRef = useRef(null);
    const passwordFieldsRef = useRef(null);

    function onFormSubmit(event) {
        event.preventDefault();

        const oldPassword = oldPasswordRef.current.value;
        const newPassword = password;

        const messageDisplay = messageDisplayRef.current;
        messageDisplay.hide(changeMsgId);

        try {
            setIsChangingPassword(true);
            Accounts.changePassword(oldPassword, newPassword, callback);
        }

        catch (error) {
            callback(new Meteor.Error('500', error.message));
        }

        function callback(error) {
            if (error)
                changeMsgId = messageDisplay.show('error', "Error changing password: " + getErrorMessage(error), changeMsgId);

            else
                changeMsgId = messageDisplay.show('success', "Password changed successfully.", changeMsgId);

            setIsChangingPassword(false);
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

    function canChange() {
        if (!password)
            return false;

        return true;
    }

    return (
        <form id="form-changePassword" onSubmit={onFormSubmit}>
            <div className="form-group">
                <label htmlFor="inputOldPassword">Current password</label>
                <input id="inputOldPassword" ref={oldPasswordRef} className="form-control form-control-sm" placeholder="Current password" required autoFocus type="password" />
            </div>

            <PasswordFields ref={passwordFieldsRef} onChange={onPasswordChange} />

            <MessageDisplay ref={messageDisplayRef} />

            <button id="btnChangePassword" className="btn btn-primary btn-sm btn-block" type="submit" disabled={!canChange()} >
                {isChangingPassword ?
                    <div><div className="loaderSpinner loader-small"/> Changing password...</div> :
                    <div>Change Password</div>
                }
            </button>

            <div id="blockClose">
                <button className="btn btn-danger btn-sm" onClick={onCloseClick}><FaTimes className="align-middle"/> Close</button>
            </div>
        </form>
    );
}