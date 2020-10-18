import React, { Component } from 'react';
import { userService, authenticationService } from '@/_services';
import { authHeader, handleResponse } from '@/_helpers';
import Button from 'react-bootstrap/Button'


class OppilasLeimaus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TunnitID: '',
            LuokkahuoneID: '',
            UserID: '',
            currentUser: authenticationService.currentUserValue,
            currentUserID: '',
            luokat: [],
        };

        this.handleChangeTunnitID = this.handleChangeTunnitID.bind(this);
        this.handleChangeLuokkahuoneID = this.handleChangeLuokkahuoneID.bind(this);
        this.handleChangeUserID = this.handleChangeUserID.bind(this);
        this.handleSubmitSisaan = this.handleSubmitSisaan.bind(this);
        this.handleSubmitUlos = this.handleSubmitUlos.bind(this);
    }

    handleChangeTunnitID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, TunnitID: syöte.toUpperCase() });
    }
    handleChangeLuokkahuoneID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, LuokkahuoneID: syöte });
    }
    handleChangeUserID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, UserID: syöte });
    }

    handleSubmitSisaan(event) {
        alert('Lähetettiin tunnit: ' + this.state.LuokkahuoneID);
        event.preventDefault();
        this.Sisaan();
    }
    handleSubmitUlos(event) {
        alert('Lähetettiin tunnit: ' + this.state.LuokkahuoneID);
        event.preventDefault();
        this.Ulos();
    }

    Sisaan() {                 
        const tunnit = {
            TunnitID: this.state.TunnitId,
            UserID: this.state.currentUserID,
            LuokkahuoneID: this.state.LuokkahuoneID
        };
        const tunnitJson = JSON.stringify(tunnit);
        console.log("tunnitJson = " + tunnitJson);
        const apiUrl = 'http://localhost:4000/api/oppilas/Sisaan/';
        //    const apiUrl= 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/logins';
        fetch(apiUrl, {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: tunnitJson
        }).then((response) => response.json())
            .then((json) => {
                // store the data returned from the backend to the current state
                const success = json;
                console.log(`Response from server: ${success}.`);
                if (success) {
                    console.log("Pyyntö tunnuksen tallettamiseksi tehty -- -- -- -- --");
                }
            });
    }

    Ulos() {                    
        const tunnit = {
            TunnitID: this.state.TunnitId,
            LuokkahuoneID: this.state.LuokkahuoneID,
            UserId: this.state.currentUserID
        };

        // send an asynchronous request to the backend
        const tunnitJson = JSON.stringify(tunnit);
        console.log("tunnitJson = " + tunnitJson);
        const apiUrl = 'http://localhost:4000/api/oppilas/ulos';
        //    const apiUrl= 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/logins';
        fetch(apiUrl, {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: tunnitJson
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log(`Response from server: ${success}.`);
                if (success) {
                    console.log("Pyyntö tunnuksen tallettamiseksi tehty -- -- -- -- --");
                }
            });
    }

    opettajaGetAll() {
        const uri = 'http://localhost:4000/api/luokat';
        const requestOptions = { method: 'GET', headers: authHeader() };
        return fetch(uri, requestOptions).then(handleResponse);
    }

    componentDidMount() {
        const { currentUser } = this.state;
        userService.getById(currentUser.id);
        this.setState({ currentUserID: this.state.currentUser.id });
        this.opettajaGetAll().then(luokat => this.setState({ luokat }));
    }

    render() {
        const { luokat } = this.state;
        return (
     
            <div className="">
                <div className="leimaus60">
                  <div>
                    <input type="hidden" value={this.state.currentUserID} placeholder="UserID" onChange={this.handleChangeUserID} />
                    <select onChange={this.handleChangeLuokkahuoneID} required>
                        <option className="optionDefaultValue" defaultValue>-Valitse luokahuone-</option>
                        {luokat.map(tunti =>
                            <option key={tunti.luokkahuoneId} value={tunti.luokkahuoneId}>{tunti.luokkaNimi}</option>)}
                    </select>
                    <br />
                    <div className="row">
                    <button onClick={this.handleSubmitSisaan} className="btn-circle" type="submit">Sisään</button>
                    <button onClick={this.handleSubmitUlos} className="btn-circle" type="submit">Ulos</button>
                    </div>
                </div>
                </div>  
                <div className="leimaus40">
                <Button variant="outline-warning" className="outline-warning">
                    <a rel="noopener noreferrer" target="_blank" href="https://outlook.office365.com">Outlook</a>
                </Button>
                <Button variant="outline-warning" className="outline-warning">
                    <a rel="noopener noreferrer" target="_blank"  href="https://www.careeria.fi/moodle-login/"> Moodle</a>
                </Button>
                <Button variant="outline-warning" className="outline-warning">
                    <a rel="noopener noreferrer" target="_blank"  href="https://wilma.careeria.fi/"> Wilma</a>
                </Button>
                <Button variant="outline-warning" className="outline-warning">
                    <a rel="noopener noreferrer" target="_blank"  href="https://www.careeria.fi/" className="outline-warning"> Careeria.fi</a>
                </Button>

                <Button variant="outline-warning" className="outline-warning">
                    <a rel="noopener noreferrer" target="_blank"  href="https://www.careeria.fi/edupoli-oy/">Edupoli oy</a>
                </Button>
                </div>
                </div>

        );
    }
}
export default OppilasLeimaus;