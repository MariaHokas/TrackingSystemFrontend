import React, { Component } from 'react';
import { userService, authenticationService } from '@/_services';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));     
    }

    render() {
        const { currentUser} = this.state;
        if (currentUser.role === 'User'){
        return (
            <div className="box4">
                <div className="coverLetter">
                <h1>Tervetuloa <strong>{currentUser.firstName}!</strong></h1>
                <h3>Valitse haluamasi toiminto</h3>              
                <Button variant="outline-warning" className="outline-warning">
                <Link to={'/OppilasLeimaus'}>Kirjaudu tunnille</Link>
                </Button>
                <Button variant="outline-warning" className="outline-warning">
                <Link to={'/OppilasRaportti'}>Siirry raporttiin</Link>
                </Button>        
                </div>
            </div>
            
        );
    }

        if (currentUser.role === 'Admin'){
            return (
                <div className="box4">
                    <div className="coverLetter">
                    <h1>Tervetuloa <strong>{currentUser.firstName}!</strong></h1>
                    <h1>Tervetuloa <strong>{currentUser.firstName}!</strong></h1>
                <h3>Valitse haluamasi toiminto</h3>             
                <Button variant="outline-warning" className="outline-warning">
                <Link to={'/OpettajaRaportti'}>Siirry raporttiin</Link>
                </Button>
                </div>
                </div>              
            );
        }
    }
}

export { HomePage };