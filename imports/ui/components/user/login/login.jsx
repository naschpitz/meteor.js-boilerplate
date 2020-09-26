import React, { useRef, useState } from 'react';
import { Meteor } from 'meteor/meteor';

import { FaTimes } from 'react-icons/fa';
import MessageDisplay from '../../messageDisplay/messageDisplay.jsx';

import './login.css';

let loginMsgId, forgotMsgId;

export default Login = (props) => {
    const [ isSendingRecovery, setIsSendingRecovery ] = useState(false);

    const emailRef = useRef(null);
    const messageDisplayRef = useRef(null);
    const passwordRef = useRef(null);

    function onFormSubmit(event) {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        Meteor.loginWithPassword(email, password, callback);

        const messageDisplay = messageDisplayRef.current;
        messageDisplay.hide(loginMsgId);

        function callback(error) {
            if (error)
                loginMsgId = messageDisplay.show('error', "Error loggin in: " + getErrorMessage(error), loginMsgId);

            else {
                if (props.onDone)
                    props.onDone();
            }
        }
    }

    function onForgotPasswordClick() {
        const email = emailRef.current.value;
        const messageDisplay = messageDisplayRef.current;

        messageDisplay.hide(forgotMsgId);

        if (!email) {
            forgotMsgId = messageDisplay.show('error', "Field 'E-mail' empty. Type in the e-mail that you registered your account in order to recover the password.", forgotMsgId);
            return;
        }

        setIsSendingRecovery(true);

        Accounts.forgotPassword({ email: email }, callback);

        function callback(error) {
            if (error)
                forgotMsgId = messageDisplay.show('error', "E-mail not registered in the database.", forgotMsgId);

            else {
                const message = <span id="forgotMsg">An e-mail for password recovery has been sent to the registered address. Please check your <strong>SPAM</strong> box you if don't receive it in a few minutes.</span>
                forgotMsgId = messageDisplay.show('success', message, forgotMsgId);
            }

            setIsSendingRecovery(false);
        }
    }

    function onCloseClick() {
        if (props.onDone)
            props.onDone();
    }

    return (
        <form id="form-login" onSubmit={onFormSubmit}>
            <div className="form-group">
                <label htmlFor="inputEmail">E-mail</label>
                <input id="inputEmail" ref={emailRef} className="form-control form-control-sm" placeholder="mail@domain.com" required autoFocus type="email"/>
            </div>

            <div className="form-group">
                <label htmlFor="inputPassword">Password</label>
                <input id="inputPassword" ref={passwordRef} className="form-control form-control-sm" placeholder="Password" required type="password"/>
            </div>

            <MessageDisplay ref={messageDisplayRef} />

            <div id="loginWithPassword">
                <button className="btn btn-primary btn-sm btn-block" id="btnLogin" type="submit">
                    {Meteor.loggingIn() ?
                        <div><div className="loaderSpinner loader-small"/> Logging in...</div> :
                        <div>Login</div>
                    }
                </button>
            </div>

            <div id="blockForgotPassword">
                {isSendingRecovery ?
                    <div><div className="loaderSpinner loader-small"/> Sending password recovery...</div> :
                    <a href="#" onClick={onForgotPasswordClick} id="forgotPassword">Forgot my password</a>
                }
            </div>

            <div id="blockClose">
                <button className="btn btn-danger btn-sm" onClick={onCloseClick}><FaTimes className="align-middle"/> Close</button>
            </div>
        </form>
    );
}