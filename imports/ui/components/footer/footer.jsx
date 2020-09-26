import React from 'react';
import { Link } from 'react-router-dom';
import useScreenSize from '../screenSize/screenSize.jsx';

import './footer.css';

export default Footer = () => {
    const screenSize = useScreenSize();

    function renderText() {
        if (screenSize === 'xs')
            return <p className="text-muted text-center">Boilerplate.com 2020 || <Link to={"/disclaimer"}>Disclaimer</Link> || <Link to={"/privacy"}>Privacy Policy</Link> || <Link to={"/terms"}>Terms</Link></p>

        return <p className="text-muted text-center">Boilerplate.com 2020 || <Link to={"/disclaimer"}>Disclaimer</Link> || <Link to={"/privacy"}>Privacy Policy</Link> || <Link to={"/terms"}>Terms</Link> || contact@boilerplate.com</p>
    }

    return (
        <footer className="footer">
            <div className="container">
                {renderText()}
            </div>
        </footer>
    );
}