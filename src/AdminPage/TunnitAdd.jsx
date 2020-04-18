import React, { Component } from 'react';



class TunnitAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { TunnitID: '', LuokkahuoneID: '', OppilasID: '', Sisaan: '', Ulos: ''};
        this.handleChangeTunnitID = this.handleChangeTunnitID.bind(this);
        this.handleChangeLuokkahuoneID = this.handleChangeLuokkahuoneID.bind(this);
        this.handleChangeOppilasID = this.handleChangeOppilasID.bind(this);
        this.handleChangeSisaan = this.handleChangeSisaan.bind(this);
        this.handleChangeUlos = this.handleChangeUlos.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    dismiss() {
        console.log("Ollaan NWLoginAdd -dismiss()-rutiinissa - - - - - - ");
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
    handleChangeOppilasID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, OppilasID: syöte });
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
        alert('Lähetettiin tunti: ' + this.state.LuokkahuoneID + ' ' + this.state.OppilasID);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    InsertoiKantaan() {
        // Luodaan tuntiobjekti, johon haetaan state:sta tiedot                     
        const tunti = {
            TunnitID: this.state.TunnitId,
            LuokkahuoneID: this.state.LuokkahuoneID,
            OppilasID: this.state.OppilasID,
            Sisaan: this.state.Sisaan,
            Ulos: this.state.Ulos
        };

        // send an asynchronous request to the backend
        const tuntiJson = JSON.stringify(tunti);
        console.log("tuntiJson = " + tuntiJson);
        const apiUrl = 'http://localhost:4000/api/opettaja/leimaus';
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

    render()
     {
        return (
            <div>
                <form className="box3" onSubmit={this.handleSubmit}>

                    <input type="text" placeholder="LuokkahuoneID" onChange={this.handleChangeLuokkahuoneID} />
                    <input type="text" placeholder="OppilasID" onChange={this.handleChangeOppilasID} />
                    <input type="datetime-local" placeholder="Sisaan" onChange={this.handleChangeSisaan} />
                    <input type="datetime-local" placeholder="Ulos" onChange={this.handleChangeUlos}/>                  
                    <br />
                
                    <button type="submit">Tallenna</button>
                </form>
            </div>
        );
    }
}
export default TunnitAdd;