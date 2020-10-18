import React, { Component } from 'react';
import moment from 'moment';


class TunnitDelete extends Component {
    constructor(props) {
        super(props);
        this.state = { tuntiObj: [], TunnitID: '', LuokkahuoneNimi: '', oppilasName: '', Sisaan: '', Ulos: ''};
        this.handleChangeTunnitID = this.handleChangeTunnitID.bind(this);
        this.handleChangeLuokkahuoneNimi = this.handleChangeLuokkahuoneNimi.bind(this);
        this.handleChangeoppilasName = this.handleChangeoppilasName.bind(this);
        this.handleChangeSisaan = this.handleChangeSisaan.bind(this);
        this.handleChangeUlos = this.handleChangeUlos.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePerformDelete = this.handlePerformDelete.bind(this);
    }
    dismiss() {
        this.props.unmountMe();
    }
    handleChangeTunnitID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, TunnitID: syöte.toUpperCase() });
    }
    handleChangeLuokkahuoneNimi(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, LuokkahuoneNimi: syöte });
    }
    handleChangeoppilasName(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, oppilasName: syöte });
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
        alert('Lähetettiin tunti: ' + this.state.oppilasName);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    callBackRoutine() {
        console.log('NWCustomerDelete: . . . . callBackRoutine >>>---' + this.state.tuntiObj.TunnitID);
    }

    componentDidMount() {    
        this.setState({
            TunnitID: this.props.tuntiObj.tunnitId,
            LuokkahuoneNimi: this.props.tuntiObj.luokkahuoneNimi,
            oppilasName: this.props.tuntiObj.oppilasName,
            Sisaan: this.props.tuntiObj.sisaan,
            Ulos: this.props.tuntiObj.ulos,
        }
        );
        //Tutkitaan onko arvo null --> jos ei, niin viedään se stateen
        if (this.props.tuntiObj.city) { this.setState({ City: this.props.tuntiObj.city }); };
        if (this.props.tuntiObj.country) {
            this.setState({ Country: this.props.tuntiObj.country });
        };
    }

    handlePerformDelete(event) {    
        event.preventDefault();
        this.NWDeleteRestApista();
    }

    ResetDeleteDone() {
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
                }
            });
    }

    render() {
        return (
            <form className="box3" onSubmit={this.handlePerformDelete}>
                <table id="deletetbl">
                    <tbody>
                        <tr><td className="otsikko">tuntitunti:</td><td>{this.state.TunnitID}</td></tr>
                        <tr><td className="otsikko">LuokkahuoneNimi:</td><td>{this.state.LuokkahuoneNimi}</td></tr>
                        <tr><td className="otsikko">oppilasName:</td><td>{this.state.oppilasName} </td></tr>
                        <tr><td className="otsikko">Sisaan:</td><td>{moment(new Date(this.state.Sisaan)).format("DD.MM.YYYY hh:mm a")}</td></tr>
                        <tr><td className="otsikko">Ulos:</td><td>{moment(new Date(this.state.Ulos)).format("DD.MM.YYYY hh:mm a")}</td></tr>
                    </tbody>
                </table>
                <br />
                <button type="submit">Vahvista poisto</button>
            </form>
        );
    }
}
export default TunnitDelete;