import React, { Component } from 'react';
import { authHeader, handleResponse } from '@/_helpers';
import { render } from 'react-dom'



class TunnitAdd extends Component {
    constructor(props) {
        super(props);

        this.state = { TunnitID: '', LuokkahuoneID: '', UserId: '', luokat: [], users: [] };
        this.handleChangeTunnitID = this.handleChangeTunnitID.bind(this);
        this.handleChangeLuokkahuoneID = this.handleChangeLuokkahuoneID.bind(this);
        this.handleChangeUserId = this.handleChangeUserId.bind(this);
        this.handleChangeSisaan = this.handleChangeSisaan.bind(this);
        this.handleChangeUlos = this.handleChangeUlos.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    dismiss() {
        this.props.unmountMe();
    }

    handleChangeTunnitID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, TunnitID: syöte.toUpperCase() });
    }
    handleChangeLuokkahuoneID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, LuokkahuoneID: syöte });
    }
    handleChangeUserId(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, UserId: syöte });
    }
    handleChangeSisaan(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Sisaan: syöte });
    }
    handleChangeUlos(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Ulos: syöte });
    }
    handleSubmit(event) {
        alert('Lähetettiin tunti: ' + this.state.LuokkahuoneID + ' ' + this.state.UserId);
        event.preventDefault();
        this.InsertoiKantaan();
    }


    InsertoiKantaan() {
        // Luodaan tuntiobjekti, johon haetaan state:sta tiedot                     
        const tunti = {
            // TunnitID: parseInt(this.state.TunnitId),
            LuokkahuoneID: this.state.LuokkahuoneID,
            UserId: parseInt(this.state.UserId),
            Sisaan: this.state.Sisaan,
            Ulos: this.state.Ulos
        };

        // send an asynchronous request to the backend
        const tuntiJson = JSON.stringify(tunti);
        console.log("tuntiJson = " + tuntiJson);
        const apiUrl = 'http://localhost:4000/api/opettaja/add';
        //    const apiUrl= 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/logins';
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: tuntiJson
        }).then((response) => response.json())
            .then((json) => {
                // store the data returned from the backend to the current state
                const success = json;
                console.log(`Response from server: ${success}.`);
                if (success) {
                    console.log("Pyyntö tunnuksen tallettamiseksi tehty -- -- -- -- --");
                    this.dismiss();
                }
            });
    }

    luokatGetAll() {
        const uri = 'http://localhost:4000/api/luokat';
        const requestOptions = { method: 'GET', headers: authHeader() };
        return fetch(uri, requestOptions).then(handleResponse);
    }

    usersGetAll() {
        const uri = 'http://localhost:4000/api/helpers/user';
        const requestOptions = { method: 'GET', headers: authHeader() };
        return fetch(uri, requestOptions).then(handleResponse);
    }

    componentDidMount() {
        this.luokatGetAll().then(luokat => this.setState({ luokat }));
        this.usersGetAll().then(users => this.setState({ users }));
    }
    render() {
        const { luokat } = this.state;
        const { users } = this.state;
        return (
            <div>
                <form className="box3" onSubmit={this.handleSubmit}>

                    {/* <input type="text" placeholder="LuokkahuoneID" onChange={this.handleChangeLuokkahuoneID} /> */}
                    <select onChange={this.handleChangeLuokkahuoneID}>
                        <option className="optionDefaultValue" defaultValue>-Valitse luokahuone-</option>
                        {luokat.map(tunti =>
                            <option key={tunti.luokkahuoneId} value={tunti.luokkahuoneId}>{tunti.luokkaNimi}</option>)}
                    </select>
                    {/* <input type="text" placeholder="UserId" onChange={this.handleChangeUserId} /> */}
                    <select onChange={this.handleChangeUserId}>
                        <option className="optionDefaultValue" defaultValue selected={true}>-Valitse oppilas-</option>
                        {users.map(user =>
                            <option key={user.id} value={user.id}>{user.name}</option>)}
                    </select>

                    <input className="date" type="datetime-local" placeholder="Sisaan" onChange={this.handleChangeSisaan} />
                    <input className="date" type="datetime-local" placeholder="Ulos" onChange={this.handleChangeUlos}/>    
                    <br />

                    <button type="submit">Tallenna</button>
                </form>
            </div>
        );
    }
}
export default TunnitAdd;