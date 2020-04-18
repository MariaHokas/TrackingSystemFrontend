import React, { Component } from 'react';



class TunnitEdit extends Component {
    constructor(props) {
      super(props);
      this.state = { tuntiObj: [], TunnitID: '', LuokkahuoneID: '', OppilasID: '', Sisaan: '', Ulos: ''};
      this.handleChangeTunnitID = this.handleChangeTunnitID.bind(this);
      this.handleChangeLuokkahuoneID = this.handleChangeLuokkahuoneID.bind(this);
      this.handleChangeOppilasID = this.handleChangeOppilasID.bind(this);
      this.handleChangeSisaan = this.handleChangeSisaan.bind(this);
      this.handleChangeUlos = this.handleChangeUlos.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    dismiss() {
        console.log("Ollaan NWCustomerEDIT -dismiss()-rutiinissa - - - - - - ");
        this.props.unmountMe();
    } 

    handleChangeTunnitID(event) { 
        var syöte = event.target.value;
        this.setState({...this.state,TunnitID: syöte.toUpperCase()});
    }
    handleChangeLuokkahuoneID(event) { 
        var syöte = event.target.value;
        this.setState({...this.state,LuokkahuoneID: syöte});
    }  
    handleChangeOppilasID(event) {
        var syöte = event.target.value;
        this.setState({...this.state,OppilasID: syöte});
    }
    handleChangeSisaan(event) {
        var syöte = event.target.value;
        this.setState({...this.state,Sisaan: syöte});
    }
    handleChangeUlos(event) {
        var syöte = event.target.value;
        this.setState({...this.state,Ulos: syöte});
    }

    handleSubmit(event) {
        alert('Päivitettävä tunti: ' + this.state.TunnitID);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    callBackRoutine() {
        console.log('NWCustomerEDIT: . . . . callBackRoutine >>>---' + this.state.tuntiObj.TunnitID);
    }

    componentDidMount() {
        console.log("NWCustomerEDIT-componentDidMount this.props.tuntiObj.TunnitID: " + this.props.tuntiObj.tunnitId);
        this.setState({
            TunnitID: this.props.tuntiObj.tunnitId,
            LuokkahuoneID: this.props.tuntiObj.luokkahuoneId,
            OppilasID: this.props.tuntiObj.oppilasId,
            Sisaan: this.props.tuntiObj.sisaan,
            Ulos: this.props.tuntiObj.ulos}
            );
            //Tutkitaan onko arvo null --> jos ei, niin viedään se stateen
            if (this.props.tuntiObj.city) {this.setState({City: this.props.tuntiObj.city});};
            if (this.props.tuntiObj.country) {
                this.setState({Country: this.props.tuntiObj.country});
            };
    }

    InsertoiKantaan() {
        // Luodaan tuntiObjekti, johon haetaan state:sta tiedot                     
       const tunti = {TunnitID: this.state.TunnitID,
                       LuokkahuoneID: this.state.LuokkahuoneID,
                       OppilasID: this.state.OppilasID,
                       Sisaan: this.state.Sisaan,
                       Ulos: this.state.Ulos,
                     };
       // send an asynchronous request to the backend
       const tuntiJson = JSON.stringify(tunti);
       console.log("tuntiJson = " + tuntiJson);
       const apiUrl= 'http://localhost:4000/api/opettaja/'+this.state.TunnitID;
    //    const apiUrl= 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/customer/'+this.state.TunnitID;
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
                  console.log("Pyyntö asiakkaan päivittämiseksi tehty -- -- -- -- --");
                  this.dismiss();
               }
           });
    }

    render() {
        return (

        <div className="box3">
        <form onSubmit={this.handleSubmit}>        
            <input type="text" value={this.state.TunnitID} title="Syötä tuntitunti" placeholder="TunnitID" onChange={this.handleChangeTunnitID} />    
            <input type="text" value={this.state.LuokkahuoneID} placeholder="LuokkahuoneID" onChange={this.handleChangeLuokkahuoneID} />  
            <input type="text" value={this.state.OppilasID} placeholder="OppilasID" onChange={this.handleChangeOppilasID} />    
            <input type="datetime-local" value={this.state.Sisaan} placeholder="Sisaan" onChange={this.handleChangeSisaan} />   
            <input type="datetime-local" value={this.state.Ulos} placeholder="Ulos" onChange={this.handleChangeUlos} />   
            <br/>
            <button type="submit">Talleta muutokset</button> 
        </form>
        </div>
        );
    }
}
export default TunnitEdit;