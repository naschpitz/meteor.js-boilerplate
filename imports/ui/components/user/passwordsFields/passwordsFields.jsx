import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const PasswordFields = (props) => {
    const passwordRef = useRef(null);
    const passwordCheckRef = useRef(null);

    function onKeyUp() {
        const password = passwordRef.current.value;
        const passwordCheck = passwordCheckRef.current.value;

        if (password === passwordCheck)
            props.onChange(password);

        else
            props.onChange();
    }

    return (
        <div id="form-passwordFields" className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input className="form-control form-control-sm" id="inputPassword" ref={passwordRef} onKeyUp={onKeyUp}  placeholder="Password" required type="password" />
            <input className="form-control form-control-sm" id="inputPasswordCheck" ref={passwordCheckRef} onKeyUp={onKeyUp} placeholder="Type your password again" required type="password" />
        </div>
    )
}

PasswordFields.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default PasswordFields;