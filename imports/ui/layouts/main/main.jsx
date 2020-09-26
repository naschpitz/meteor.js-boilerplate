import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import Alert from 'react-s-alert';
import ClipLoader from 'react-spinners/ClipLoader';
import Loadable from 'react-loadable';

import ShareButtons from '../../components/shareButtons/shareButtons.jsx';
import UniqueModal from '@naschpitz/unique-modal';

import './main.css';

const Disclaimer = Loadable({
    loader: () => { return import('../../components/disclaimer/disclaimer.jsx'); },
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props}/>;
    },
    loading: () => (null)
});

const Footer = Loadable({
    loader: () => { return import('../../components/footer/footer.jsx'); },
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props}/>;
    },
    loading: () => (null)
});

const Home = Loadable({
    loader: () => { return import('../../components/home/home.jsx'); },
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props}/>;
    },
    loading: () => (
        <div className="text-center">
            <ClipLoader size={50} color={"#DDD"} loading={true}/>
        </div>
    ),
});

const Navbar = Loadable({
    loader: () => { return import('../../components/navbar/navbar.jsx'); },
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props}/>;
    },
    loading: () => (null)
});

const Privacy = Loadable({
    loader: () => { return import('../../components/privacy/privacy.jsx'); },
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props}/>;
    },
    loading: () => (null)
});

const Terms = Loadable({
    loader: () => { return import('../../components/terms/terms.jsx'); },
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props}/>;
    },
    loading: () => (null)
});

const routes = [{
        path: '/',
        exact: true,
        strict: true,
        header: (props) => <Navbar {...props}/>,
        content: (props) => <Home {...props}/>,
        footer: () => <Footer/>
    }, {
        path: '/disclaimer',
        exact: true,
        strict: false,
        header: (props) => <Navbar {...props}/>,
        content: (props) => <Disclaimer {...props}/>,
        footer: () => <Footer/>
    }, {
        path: '/privacy',
        exact: true,
        strict: false,
        header: (props) => <Navbar {...props}/>,
        content: (props) => <Privacy {...props}/>,
        footer: () => <Footer/>
    }, {
        path: '/terms',
        exact: true,
        strict: false,
        header: (props) => <Navbar {...props}/>,
        content: (props) => <Terms {...props}/>,
        footer: () => <Footer/>
    }
];

export default MainLayout = () => {
    return (
        <div id="box" className="d-flex flex-column">
            <UniqueModal/>

            <header id="mainLayoutHeader" className="sticky-top">
                <Switch>
                    {routes.map((route, index) => (
                        <Route key={index}
                               path={route.path}
                               exact={route.exact}
                               strict={route.strict}
                               component={route.header}
                        />
                    ))}
                </Switch>
            </header>

            <div id="mainLayoutContent" className="mt-auto">
                <Switch>
                    {routes.map((route, index) => (
                        <Route key={index}
                               path={route.path}
                               exact={route.exact}
                               strict={route.strict}
                               component={route.content}
                        />
                    ))}
                </Switch>

                <ShareButtons/>
            </div>

            <footer id="mainLayoutFooter" className="mt-auto">
                <Switch>
                    {routes.map((route, index) => (
                        <Route key={index}
                               path={route.path}
                               exact={route.exact}
                               strict={route.strict}
                               component={route.footer}
                        />
                    ))}
                </Switch>
            </footer>

            <Alert stack={{limit: 5}} position="bottom-right" timeout={7500} html={true} />
        </div>
    );
}