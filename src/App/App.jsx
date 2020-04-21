import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history, Role } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { AdminPage } from '@/AdminPage';
import { LoginPage } from '@/LoginPage';
import OppilasLeimaus from '../AdminPage/OppilasLeimaus';
import UserFetch from '../AdminPage/UserFetch';
// import Opettaja from '../AdminPage/Opettaja';
import CreateUser from '../Homepage/CreateUser';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');    
    }
    render() {
        const { currentUser, isAdmin } = this.state;
        console.log(currentUser);
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to={'/'} className="nav-item nav-link">Home</Link>
                                {isAdmin && <Link to={'/admin'} className="nav-item nav-link">Admin</Link>}
                                {isAdmin && <Link to={'/OppilasLeimaus'} className="nav-item nav-link">OppilasLeimaus</Link>}
                                {isAdmin && <Link to={'/UserFetch'} className="nav-item nav-link">UserFetch</Link>}
                                {/* {isAdmin && <Link to={'/Opettaja'} className="nav-item nav-link">Opettaja</Link>} */}
                                <Link to={'/CreateUser'} className="nav-item nav-link">CreateUser</Link>
                                <a onClick={this.logout} className="nav-item nav-link" href="/login">Logout</a>
                            </div>
                        </nav>
                    }
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
                                    <PrivateRoute path="/OppilasLeimaus" roles={[Role.Admin]} component={OppilasLeimaus} />
                                    <PrivateRoute path="/UserFetch" roles={[Role.Admin]} component={UserFetch} />
                                    {/* <PrivateRoute path="/Opettaja" roles={[Role.Admin]} component={Opettaja} /> */}
                                    <PrivateRoute path="/CreateUser" component={CreateUser} />
                                    <Route path="/login" component={LoginPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export { App };
