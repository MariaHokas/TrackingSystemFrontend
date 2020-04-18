import React, { Component } from 'react';


class TunnitDelete extends Component {
    constructor(props) {
        super(props);
        this.state = { tuntiObj: [], TunnitID: '', LuokkahuoneID: '', OppilasID: '', Sisaan: '', Ulos: ''};
        this.handleChangeTunnitID = this.handleChangeTunnitID.bind(this);
        this.handleChangeLuokkahuoneID = this.handleChangeLuokkahuoneID.bind(this);
        this.handleChangeOppilasID = this.handleChangeOppilasID.bind(this);
        this.handleChangeSisaan = this.handleChangeSisaan.bind(this);
        this.handleChangeUlos = this.handleChangeUlos.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePerformDelete = this.handlePerformDelete.bind(this);
    }
    dismiss() {
        console.log("Ollaan NWCustomerDelete -dismiss()-rutiinissa - - - - - - ");
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
        alert('Lähetettiin tunti: ' + this.state.OppilasID);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    callBackRoutine() {
        console.log('NWCustomerDelete: . . . . callBackRoutine >>>---' + this.state.tuntiObj.TunnitID);
    }

    componentDidMount() {
        console.log("NWCustomerDelete-componentDidMount this.props.tuntiObj: " + this.props.tuntiObj.tunnitId);
        this.setState({
            TunnitID: this.props.tuntiObj.tunnitId,
            LuokkahuoneID: this.props.tuntiObj.luokkahuoneId,
            OppilasID: this.props.tuntiObj.oppilasId,
            Sisaan: this.props.tuntiObj.sisaan,
            Ulos: this.props.tuntiObj.ulos
        }
        );
        //Tutkitaan onko arvo null --> jos ei, niin viedään se stateen
        if (this.props.tuntiObj.city) { this.setState({ City: this.props.tuntiObj.city }); };
        if (this.props.tuntiObj.country) {
            this.setState({ Country: this.props.tuntiObj.country });
        };
    }

    handlePerformDelete(event) {
        console.log('NWCutomerDelete . handlePerformDelete . . . . delete:ssä', this.state.TunnitID);
        event.preventDefault();
        this.NWDeleteRestApista();
    }

    ResetDeleteDone() {
        console.log('ResetDeleteDone ???????????????');
        this.setState({
            TunnitID: '',
        })
        this.handleClickTable();
        this.HaeNWRestApista();
    }

    NWDeleteRestApista() {
        let apiUrl = 'http://localhost:4000/api/opettaja/' + this.state.TunnitID;
        // let apiUrl = 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/customer/'+this.state.TunnitID;
        console.log("NWDeleteRestApista " + apiUrl);
        fetch(apiUrl, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: null
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log(`Response from server: ${success}.`);
                if (success) {
                    console.log("Pyyntö tunnuksen poistamiseksi tehty -- -- -- -- --");
                    this.dismiss();
                    //this.ResetDeleteDone();
                }
            });
    }

    render() {
        return (
            <form className="box3" onSubmit={this.handlePerformDelete}>
                <table id="deletetbl">
                    <tbody>
                        <tr><td className="otsikko">tuntitunti:</td><td>{this.state.TunnitID}</td></tr>
                        <tr><td className="otsikko">LuokkahuoneID:</td><td>{this.state.LuokkahuoneID}</td></tr>
                        <tr><td className="otsikko">OppilasID:</td><td>{this.state.OppilasID} </td></tr>
                        <tr><td className="otsikko">Sisaan:</td><td>{this.state.Sisaan} </td></tr>
                        <tr><td className="otsikko">Ulos:</td><td>{this.state.Ulos} </td></tr>
                    </tbody>
                </table>
                <br />
                <button type="submit">Vahvista poisto</button>
            </form>
        );
    }
}
export default TunnitDelete;