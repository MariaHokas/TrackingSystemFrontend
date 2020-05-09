import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { history, Role } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { AdminPage } from '@/AdminPage';
import { LoginPage } from '@/LoginPage';
import OppilasLeimaus from '../Homepage/OppilasLeimaus';
import UserFetch from '../AdminPage/UserFetch';
// import Opettaja from '../AdminPage/Opettaja';
import CreateUser from '../Homepage/CreateUser';
import OppilasRaportti from '../HomePage/OppilasRaportti';
import Dropdown1 from '../HomePage/Dropdown1';
import OpettajaRaportti from '../OpettajaPage/OpettajaRaportti';
import '../styles.less';

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
                            <Navbar.Brand href="#home"></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Link to={'/'} className="nav-item nav-link">Home</Link>
                                    {isAdmin && <Link to={'/admin'} className="nav-item nav-link">Admin</Link>}
                                    <Link to={'/OppilasLeimaus'} className="nav-item nav-link">OppilasLeimaus</Link>
                                    {isUser && <Link to={'/OppilasRaportti'} className="nav-item nav-link">OppilasRaportti</Link>}
                                    <Link to={'/Dropdown1'} className="nav-item nav-link">Dropdown1</Link>
                                    {isAdmin && <Link to={'/UserFetch'} className="nav-item nav-link">UserFetch</Link>}
                                    <Link to={'/CreateUser'} className="nav-item nav-link">CreateUser</Link>  
                                    <Link to={'/OpettajaRaportti'} className="nav-item nav-link">OpettajaRaportti</Link>                        
                                </Nav>
                            <div className="hellotext">
                                <a onClick={this.logout} className="nav-item nav-link" href="/login">Kirjaudu ulos</a>                               
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
                                    <Route path="/Dropdown1" component={Dropdown1} />
                                    <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
                                    <PrivateRoute path="/UserFetch" roles={[Role.Admin]} component={UserFetch} />
                                    {/* <PrivateRoute path="/Opettaja" roles={[Role.Admin]} component={Opettaja} /> */}
                                    <PrivateRoute path="/CreateUser" component={CreateUser} />
                                    <Route path="/OpettajaRaportti" component={OpettajaRaportti} />
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
