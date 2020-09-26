import React, { useRef, useState } from 'react';
import { Meteor } from 'meteor/meteor';

import { FaTimes } from 'react-icons/fa';
import MessageDisplay from '../../messageDisplay/messageDisplay.jsx';
import PasswordFields from '../passwordsFields/passwordsFields.jsx';

import './register.css';

let registerMsgId, existsMsgId, passwordMsgId;

export default Register = (props) => {
    const [ isRegistering, setIsRegistering ] = useState(false);
    const [ password, setPassword ] = useState(false);
    const [ usernameExists, setUsernameExists ] = useState(false);

    const emailRef = useRef(null);
    const messageDisplayRef = useRef(null);

    function onFormSubmit(event) {
        event.preventDefault();

        const email = emailRef.current.value;

        const options = {
            email: email,
            password: password
        };

        const messageDisplay = messageDisplayRef.current;
        messageDisplay.hide(registerMsgId);

        Meteor.call('users.create', options, callback);

        setIsRegistering(true);

        function callback(error) {
            if (error)
                registerMsgId = messageDisplay.show('error', "Error registering user: " + getErrorMessage(error), registerMsgId);

            else {
                registerMsgId = messageDisplay.show('success', "User successfully registered. A confirmation e-mail has been sent to you.", registerMsgId);
                Meteor.loginWithPassword(email, password);
            }

            setIsRegistering(false);
        }
    }

    function onEmailChange() {
        const email = emailRef.current.value;

        Meteor.call('users.getUserByEmail', email, callback);

        const messageDisplay = messageDisplayRef.current;
        messageDisplay.hide(existsMsgId);

        function callback(error, result) {
            if (result) {
                setUsernameExists(true);
                existsMsgId = messageDisplay.show('error', "There is already an user registered with this e-mail address.", existsMsgId);
            }

            else {
                setUsernameExists(false);
                messageDisplay.hide(existsMsgId);
            }
        }
    }

    function onPasswordChange(password) {
        const messageDisplay = messageDisplayRef.current;

        if (!password) {
            setPassword(null);
            passwordMsgId = messageDisplay.show('error', "The typed passwords do not match.", passwordMsgId);
        }

        else {
            setPassword(password);
            messageDisplay.hide(passwordMsgId);
        }
    }

    function canRegister() {
        if (!password || usernameExists)
            return false;

        return true;
    }

    function onCloseClick() {
        if (props.onDone)
            props.onDone();
    }

    return (
        <form id="form-register" onSubmit={onFormSubmit}>
            <div className="form-group">
                <label htmlFor="inputEmail">E-mail</label>
                <input className="form-control form-control-sm" id="inputEmail" ref={emailRef} onChange={onEmailChange} placeholder="mail@domain.com" required autoFocus type="email"/>
            </div>

            <PasswordFields onChange={onPasswordChange}/>

            <MessageDisplay ref={messageDisplayRef}/>

            <button className="btn btn-primary btn-sm btn-block" disabled={!canRegister()} id="btnRegister" type="submit">
                {isRegistering ?
                    <div><div className="loaderSpinner loader-small"/> Registering...</div> :
                    <div>Register</div>
                }
            </button>

            <div id="blockClose">
                <button className="btn btn-danger btn-sm" id="btnClose" onClick={onCloseClick}><FaTimes className="align-middle"/> Close</button>
            </div>
        </form>
    );
}