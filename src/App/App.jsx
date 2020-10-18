import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { history, Role } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { LoginPage } from '@/LoginPage';
import { CreateUser } from '@/LoginPage';
import { AddEdit } from '@/LoginPage';
import OppilasLeimaus from '../Homepage/OppilasLeimaus';
import OppilasRaportti from '../HomePage/OppilasRaportti';
import OpettajaRaportti from '../OpettajaPage/OpettajaRaportti';
import '../styles.less';
import Logo from '../images/Careeria_logo_valkoinen.png';

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
            isAdmin: x && x.role === Role.Admin,
            isUser: x && x.role === Role.User
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }
    render() {
        const { currentUser, isAdmin, isUser } = this.state;
        // console.log(currentUser);
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <Navbar bg="nav_nw" variant="dark" expand="lg" className="nav_nw">
                            <Navbar.Brand href="#home">    
                                <img
                                className="nav_logo" src={Logo} alt="Careeria logo" 
                                />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Link to={'/'} className="nav-item nav-link">Home</Link>
                                    {isUser && <Link to={'/OppilasLeimaus'} className="nav-item nav-link">OppilasLeimaus</Link>}
                                    {isUser && <Link to={'/OppilasRaportti'} className="nav-item nav-link">OppilasRaportti</Link>}
                                    {isAdmin && <Link to={'/OpettajaRaportti'} className="nav-item nav-link">OpettajaRaportti</Link>}
                                </Nav>
                                <div className="hellotext">
                                    <a onClick={this.logout} className="nav-item" href="/login">Kirjaudu ulos</a>
                                </div>
                            </Navbar.Collapse>
                        </Navbar>
                    }
                    <div>
                        <div>
                            <div>
                                <div>
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <Route path="/OppilasLeimaus" component={OppilasLeimaus} />
                                    <PrivateRoute path="/OppilasRaportti" roles={[Role.User]} component={OppilasRaportti} />
                                    {/* <PrivateRoute path="/Opettaja" roles={[Role.Admin]} component={Opettaja} /> */}
                                    {/* <PrivateRoute path="/CreateUser" component={CreateUser} /> */}
                                    <PrivateRoute path="/OpettajaRaportti" roles={[Role.Admin]} component={OpettajaRaportti} />
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/CreateUser" component={CreateUser} />
                                    <Route path="/AddEdit" component={AddEdit} />
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
