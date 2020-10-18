import React, { Component } from 'react';
import { authHeader, handleResponse } from '@/_helpers';

class TunnitEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tuntiObj: [], TunnitID: '', LuokkahuoneID: '', UserID: '', Sisaan: '', Ulos: '',
            oppilasName: '', luokkahuoneNimi: '', luokat: [], users: []
        };
        this.handleChangeTunnitID = this.handleChangeTunnitID.bind(this);
        this.handleChangeLuokkahuoneID = this.handleChangeLuokkahuoneID.bind(this);
        this.handleChangeUserID = this.handleChangeUserID.bind(this);
        this.handleChangeSisaan = this.handleChangeSisaan.bind(this);
        this.handleChangeUlos = this.handleChangeUlos.bind(this);
        this.handleChangeoppilasName = this.handleChangeoppilasName.bind(this);
        this.handleChangeluokkahuoneNimi = this.handleChangeluokkahuoneNimi.bind(this);
        this.handleChangeselected = this.handleChangeselected.bind(this);
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
    handleChangeUserID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, UserID: syöte });
    }
    handleChangeSisaan(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Sisaan: syöte });
    }
    handleChangeUlos(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Ulos: syöte });
    }

    handleChangeoppilasName(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, oppilasName: syöte });
    }
    handleChangeluokkahuoneNimi(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, luokkahuoneNimi: syöte });
    }
    handleChangeselected(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, selected: syöte });
    }

    handleSubmit(event) {
        alert('Päivitettävä tunti: ' + this.state.TunnitID);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    callBackRoutine() {
        console.log('NWtuntirEDIT: . . . . callBackRoutine >>>---' + this.state.tuntiObj.TunnitID);
    }

    componentDidMount() {   
        this.setState({
            TunnitID: this.props.tuntiObj.tunnitId,
            LuokkahuoneID: this.props.tuntiObj.luokkahuoneId,
            UserID: this.props.tuntiObj.userId,
            Sisaan: this.props.tuntiObj.sisaan,
            Ulos: this.props.tuntiObj.ulos,
            oppilasName: this.props.tuntiObj.oppilasName,
            luokkahuoneNimi: this.props.tuntiObj.luokkahuoneNimi,
            selected: this.props.tuntiObj.luokkahuoneNimi
        }
        );
        if (this.props.tuntiObj.luokkahuoneNimi) { this.setState({ luokkahuoneNimi: this.props.tuntiObj.luokkahuoneNimi }); };
        if (this.props.tuntiObj.UnitsOnOrder) {
            this.setState({ UnitsOnOrder: this.props.tuntiObj.UnitsOnOrder });
        };

        this.usersGetAll().then(users => this.setState({ users }));
        this.luokatGetAll().then(luokat => this.setState({ luokat }));
        
    }

    InsertoiKantaan() {                   
        const tunti = {
            LuokkahuoneID: this.state.LuokkahuoneID,
            UserID: parseInt(this.state.UserID),
            Sisaan: this.state.Sisaan,
            Ulos: this.state.Ulos
        };


        // send an asynchronous request to the backend
        const tuntiJson = JSON.stringify(tunti);
        console.log("tuntiJson = " + tuntiJson);
        const apiUrl = 'http://localhost:4000/api/opettaja/' + this.state.TunnitID;
        //    const apiUrl= 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/customer/'+this.state.TunnitID;
        console.log(apiUrl)
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: tuntiJson
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log(`Response from server: ${success}.`);
                if (success) {
                    // console.log("Pyyntö asiakkaan päivittämiseksi tehty -- -- -- -- --");
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


    render() {
        const { luokat } = this.state;
        const { users } = this.state;
        return (
            <div className="box3">
                <form onSubmit={this.handleSubmit}>
                    <select onChange={this.handleChangeLuokkahuoneID} >
                        <option className="optionDefaultValue" key={this.state.LuokkahuoneID} value={this.state.LuokkahuoneID}>{this.state.luokkahuoneNimi}</option>
                        {luokat.map(tunti =>
                            <option key={tunti.luokkahuoneId} value={tunti.luokkahuoneId}>{tunti.luokkaNimi}</option>)}
                    </select>

                    <select onChange={this.handleChangeUserID}>
                        <option className="optionDefaultValue" key={this.state.UserID} value={this.state.UserID}>{this.state.oppilasName}</option>
                        {users.map(user =>
                            <option key={user.id} value={user.id}>{user.name}</option>)}
                    </select>
                    <label>Sisaan</label><input type="datetime-local" value={this.state.Sisaan} placeholder="Sisaan" onChange={this.handleChangeSisaan} />
                    <label>Ulos</label><input type="datetime-local" value={this.state.Ulos} placeholder="Ulos" onChange={this.handleChangeUlos} />
                    <br />

                    <button type="submit">Talleta muutokset</button>
                </form>
            </div>
        );
    }
}
export default TunnitEdit;