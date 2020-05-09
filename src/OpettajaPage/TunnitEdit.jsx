import React, { Component } from 'react';
import { authHeader, handleResponse } from '@/_helpers';

class TunnitEdit extends Component {
        constructor(props) {
            super(props);
            this.state = { tuntiObj: [], TunnitID: '', LuokkahuoneID: '', UserID: '', Sisaan: '', Ulos: '', oppilasName: '', luokkahuoneNimi: '', luokat: [] };
            this.handleChangeTunnitID = this.handleChangeTunnitID.bind(this);
            this.handleChangeLuokkahuoneID = this.handleChangeLuokkahuoneID.bind(this);
            this.handleChangeUserID = this.handleChangeUserID.bind(this);
            this.handleChangeSisaan = this.handleChangeSisaan.bind(this);
            this.handleChangeUlos = this.handleChangeUlos.bind(this);
            this.handleChangeoppilasName = this.handleChangeoppilasName.bind(this);
            this.handleChangeluokkahuoneNimi = this.handleChangeluokkahuoneNimi.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
        dismiss() {
            console.log("Ollaan NWCustomerEDIT -dismiss()-rutiinissa - - - - - - ");
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
     
        handleSubmit(event) {
            alert('Päivitettävä tunti: ' + this.state.TunnitID);
            event.preventDefault();
            this.InsertoiKantaan();
        }
    
        callBackRoutine() {
            console.log('NWtuntirEDIT: . . . . callBackRoutine >>>---' + this.state.tuntiObj.TunnitID);
        }
    
        componentDidMount() {
            
            // console.log("NWtuntiEDIT-componentDidMount this.props.tuntiObj.TunnitID: " + this.props.tuntiObj.tunnitId);
            this.setState({
                TunnitID: this.props.tuntiObj.tunnitId,
                LuokkahuoneID: this.props.tuntiObj.LuokkahuoneID,
                UserID: this.props.tuntiObj.UserID,
                Sisaan: this.props.tuntiObj.sisaan,
                Ulos: this.props.tuntiObj.ulos,
                oppilasName: this.props.tuntiObj.oppilasName,
                luokkahuoneNimi: this.props.tuntiObj.luokkahuoneNimi
            }
            );
            //Tutkitaan onko arvo null --> jos ei, niin viedään se stateen
            if (this.props.tuntiObj.luokkahuoneNimi) { this.setState({ luokkahuoneNimi: this.props.tuntiObj.luokkahuoneNimi }); };
            if (this.props.tuntiObj.UnitsOnOrder) {
                this.setState({ UnitsOnOrder: this.props.tuntiObj.UnitsOnOrder });
            };

            this.luokatGetAll().then(luokat => this.setState({ luokat }));
        }
    
        InsertoiKantaan() {
            // Luodaan tuntiobjekti, johon haetaan state:sta tiedot                     
            const tunti = {
                LuokkahuoneID: this.state.LuokkahuoneID,
                UserID: this.state.UserID,
                Sisaan: this.state.Sisaan,
                Ulos: this.state.Ulos
            };
    
    
            // send an asynchronous request to the backend
            const tuntiJson = JSON.stringify(tunti);
            console.log("tuntiJson = " + tuntiJson);
            const apiUrl = 'https://localhost:5001/api/opettaja/' + this.state.TunnitID;
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

    
            render() {
                const { luokat } = this.state;
                    return (
                        <div className="box3">
                        <form onSubmit={this.handleSubmit}>
                            {/* <label>tuntinimi</label><input type="text" value={this.state.LuokkahuoneID} title="Syötä nimi" placeholder="LuokkahuoneID" onChange={this.handleChangeLuokkahuoneID} /> */}
                            <select onChange={this.handleChangeLuokkahuoneID} value={this.state.luokkaNimi}>{luokat.map(tunti =>
                            <option key={tunti.luokkahuoneId} value={tunti.luokkahuoneId}>{tunti.luokkaNimi}</option>)}
                            </select>
                            <label>Toimittaja</label><input type="text" value={this.state.UserID} placeholder="UserID" onChange={this.handleChangeUserID} />
                            {/* <label>Kategoriatunnus</label><input type="datetime-local" value={this.state.Sisaan} placeholder="Sisaan" onChange={this.handleChangeSisaan} />
                            <label>Määrä pakkauksessa</label><input type="datetime-local" value={this.state.Ulos} placeholder="Ulos" onChange={this.handleChangeUlos} /> */}
                            
                            <label>Sisaan</label><input type="datetime-local" value={this.state.Sisaan} placeholder="Sisaan" onChange={this.handleChangeSisaan} />
                            <label>Ulos</label><input type="datetime-local" value={this.state.Ulos} placeholder="Ulos" onChange={this.handleChangeUlos}/>          
                            <br />
                            
                            <button type="submit">Talleta muutokset</button>
                        </form>
                        </div>
                    );
            }
        }
export default TunnitEdit;