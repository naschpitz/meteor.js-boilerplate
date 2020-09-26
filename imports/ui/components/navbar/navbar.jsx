import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import Alert from 'react-s-alert';
import ChangePassword from '../user/changePassword/changePassword.jsx';
import Login from '../user/login/login.jsx';
import Register from '../user/register/register.jsx';
import ResetPassword from '../user/resetPassword/resetPassword.jsx';
import { UniqueModalController } from "@naschpitz/unique-modal";

import {FaSignInAlt, FaPlus, FaSignOutAlt, FaSyncAlt, FaKey, FaUserEdit} from 'react-icons/fa';

import './navbar.css';

class _Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resetPasswordModalIsOpen: !!Session.get('passwordResetToken')
        };

        this.checkPasswordResetToken = this.checkPasswordResetToken.bind(this);
        this.getLeftItems = this.getLeftItems.bind(this);
        this.getRightItems = this.getRightItems.bind(this);
        this.loginButton = this.loginButton.bind(this);

        this.onLoginClick = this.onLoginClick.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);
        this.onChangePasswordClick = this.onChangePasswordClick.bind(this);
        this.onResetPasswordClick = this.onResetPasswordClick.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
    }

    componentDidMount() {
        this.checkPasswordResetToken();
    }

    componentDidUpdate() {
        this.checkPasswordResetToken();
    }

    checkPasswordResetToken() {
        if (!!Session.get('passwordResetToken')) {
            UniqueModalController.open(<ResetPassword onDone={this.onModalClose}/>);
        }
    }

    getLeftItems() {
        const currentUser = this.props.currentUser;
        return (
            <React.Fragment>

            </React.Fragment>
        );
    }

    getRightItems() {
        const currentUser = this.props.currentUser;

        return (
            <React.Fragment>
                {this.loginButton()}

                {!currentUser ?
                    <React.Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" id="register" to="#" onClick={this.onRegisterClick}><FaPlus className="align-middle"/> Register</Link>
                        </li>

                        {Session.get('passwordResetToken') ?
                            <li className="nav-item">
                                <Link className="nav-link" id="resetPassword" to="#" onClick={this.onResetPasswordClick}><FaSyncAlt className="align-middle"/> Reset Password</Link>
                            </li> : null
                        }
                    </React.Fragment>: null
                }
            </React.Fragment>
        );
    }

    loginButton() {
        let displayName;
        let verified;

        const currentUser = this.props.currentUser;

        if (currentUser) {
            if (currentUser.emails) {
                displayName = currentUser.emails[0].address;
                verified = currentUser.emails[0].verified;
            }
        }

        if (currentUser) {
            return (
                <li className="nav-item dropdown" id="userDropdown">
                    <Link key="username" className="nav-link dropdown-toggle" id="username" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{displayName}</Link>

                    <div className="dropdown-menu" aria-labelledby="userDropdown">
                        <Link className="dropdown-item" id="changePasswordLink" to="#" onClick={this.onChangePasswordClick}><FaKey className="align-middle"/> Change Password</Link>
                        {!verified ?
                            <Link className="dropdown-item" id="confirmEmailLink" to="#" onClick={this.onConfirmEmailClick}><FaSyncAlt className="align-middle"/> Re-send Confirmation</Link> : null
                        }
                        <Link className="dropdown-item" id="logoutLink" to="#" onClick={this.onLogoutClick}><FaSignOutAlt className="align-middle"/> Logout</Link>
                    </div>
                </li>
            );
        }

        else {
            return (
                <li className="nav-item" id="login">
                    <Link key="login" className="nav-link" id="loginLink" to="#" onClick={this.onLoginClick}><FaSignInAlt className="align-middle"/> Login</Link>
                </li>
            );
        }
    }

    onLoginClick() {
        UniqueModalController.open(<Login onDone={this.onModalClose}/>);
    }

    onRegisterClick() {
        UniqueModalController.open(<Register onDone={this.onModalClose}/>);
    }

    onChangePasswordClick() {
        UniqueModalController.open(<ChangePassword onDone={this.onModalClose}/>);
    }

    onModalClose() {
        UniqueModalController.close();
    }

    onConfirmEmailClick() {
        Meteor.call('users.sendVerificationEmail');

        Alert.success("A confirmation e-mail has been sent to you.");
    }

    onLogoutClick() {
        // Speeds up logout process.
        Meteor._localStorage.removeItem('Meteor.loginToken');
        Meteor._localStorage.removeItem('Meteor.loginTokenExpires');
        Meteor._localStorage.removeItem('Meteor.userId');

        Meteor.logout();
    }

    onResetPasswordClick() {
        this.setState({resetPasswordModalIsOpen: true});
    }

    render() {
        return (
            <nav id="navbar" className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">
                    <img src="/images/banner.png" height="50" alt="Boilerplate.com"/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMainContent" aria-controls="navbarMainContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarMainContent">
                    <ul className="navbar-nav mr-auto">
                        {this.getLeftItems()}
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        {this.getRightItems()}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar = withTracker(() => {
    const currentUser = Meteor.user();

    return {
        currentUser: currentUser
    };
})(_Navbar);