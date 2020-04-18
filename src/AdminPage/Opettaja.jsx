import React, { Component } from 'react';
import TunnitAdd from './TunnitAdd';
import TunnitEdit from './TunnitEdit';
import TunnitDelete from './TunnitDelete';
import Table from 'react-bootstrap/Table';
import { authHeader, handleResponse } from '@/_helpers';

class Opettaja extends Component {

  constructor(props) {
    super(props);
    console.log("Opettaja-komponentti: constructor");
    this.state = { 
        tunnit: [], 
        start: 0,
        take: 10,
        visible: "table",
        renderChildAdd: true,   
        renderChildEdit: true,
        renderChildDelete: true,
        yksitunti: [], 
        poistatunti: [], 
        tuntiID: '',
        tuntiID2Del: ''  
    }; 
    this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
    this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
    this.handleChildUnmountDelete = this.handleChildUnmountDelete.bind(this);
  }

  handleChildUnmountAdd(){
    console.log("Ollaan Opettaja -handleChildUnmountAdd-rutiinissa - - - - - - ");
    this.setState({renderChildAdd: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleChildUnmountEdit(){
    console.log("Ollaan Opettaja -handleChildUnmountEdit-rutiinissa - - - - - - ");
    this.setState({renderChildEdit: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleChildUnmountDelete(){
    console.log("Ollaan Opettaja -handleChildUnmountDelete-rutiinissa - - - - - - ");
    this.setState({renderChildDelete: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleClickTable = () => {
    this.setState({visible: "table"})
  }

  handleClickAdd = () => {
    this.setState({visible: "addform", renderChildAdd: true})
  }

  handleClickHelp = () => {
    this.setState({visible: "help"})
  }

  handleClickPrev = () => {
    let startvalue = this.state.start;
    if (startvalue > 0) {
        startvalue = startvalue-10;
    }
    this.setState({start: startvalue},this.handleSubmit);
  }

  handleClickNext = () => {
    this.setState({start: this.state.start+10},this.handleSubmit);
  }

  handleSubmit() {
    console.log('HaeNWRestApista: . . . . handleSubmitissa');
    this.HaeNWRestApista();
  }

  HaeNWRestApista() {
    this.opettajaGetAll().then(tunnit => this.setState({ tunnit }));
  }

opettajaGetAll() {
  const uri = 'http://localhost:4000/api/opettaja/r?offset='+this.state.start+'&limit='+this.state.take;
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(uri, requestOptions).then(handleResponse);
}

  handleClickEdit = (dataObj, event) => {
    console.log("<<<<<<<<<<<<<handleClickEdit -- -- -- dataObj-tulostus>>>>", dataObj);
    //alert(event.type); //voidaan tutkia millainen React-eventti oli kyseessä (esim: "click")
    this.setState({
      yksitunti: dataObj, 
      visible: "editform", 
      renderChildEdit: true
    })
  }
  handleClickDelete = (dataObj, event) => {
    //console.log:ssa voi konkatenoida tekstin ja datan pilkulla ja pitääkin, jos haluaa tulostaa objektin sisällön 
    console.log("<<<<<<<<<<<<<handleClickDelete -- -- -- Poistan tunnuksen>>>>", dataObj); 
    alert("Poistan tunnuksen: " + dataObj.tunnitId); //Alertissa konkatenointi tehdään plussalla + 
    this.setState({
      poistatunti: dataObj, 
      visible: "deleteform", 
      renderChildDelete: true
    })
  }
 
  componentDidMount() {
    this.opettajaGetAll().then(tunnit => this.setState({ tunnit }));
  }

  render() {
    const { tunnit } = this.state;
    console.log( tunnit, "NWCustomerFetch-komponentti: render");
    let viesti = "NW Customers-rivejä:" + this.state.tunnit.length;
    //Ehdollinen return
    if (this.state.visible==="table") {
      return (     
      <div className="box4 kello_page">
        <h1 className="text-center">Tietokantahaku tunnit</h1>
        <button onClick={this.handleClickAdd}>Lisää tunti</button>
        {/* <button onClick={this.handleClickHelp}>Näytä opaste</button>
        <button onClick={this.handleClickAdd}>Lisää User</button> */}
                    {tunnit &&
                    <Table>
                         <thead><tr><th></th><th>Tunti</th><th>luokkahuoneId</th><th>oppilasId</th><th></th></tr></thead>
                        <tbody>                                                      
                            {tunnit.map(tunti =>                           
                                <tr key={tunti.tunnitId}>

                                <td><i className="fas fa-pencil-alt" onClick={this.handleClickEdit.bind(this, tunti)}></i></td>
                                <td>{tunti.tunnitId}</td> 
                                <td>{tunti.luokkahuoneId}</td>   
                                <td>{tunti.oppilasId}</td>
                                <td>{tunti.sisaan}</td>
                                <td>{tunti.ulos}</td>                            
                                <td><i className="fas fa-trash-alt" onClick={this.handleClickDelete.bind(this, tunti)}></i></td>                               
                            </tr>
                            )}
                        </tbody>
                    </Table>
                    }  
            <button  onClick={this.handleClickPrev}><i className="fas fa-angle-double-left"> Edelliset</i></button>
            <button  onClick={this.handleClickNext}>Seuraavat <i className="fas fa-angle-double-right"></i></button>
        <p>{viesti}</p>
          
      </div>
    );
    } else if (this.state.visible==="addform") {
      return (<div className="box4">
        <h1 className="text-center">Uuden käyttäjän lisäys</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildAdd ? <TunnitAdd unmountMe={this.handleChildUnmountAdd} /> : null }
      </div>
      );

    } else if (this.state.visible==="editform") {
      return (<div className="box4">
        <h1 className="text-center">Tuote tietojen muokkaus</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildEdit ? <TunnitEdit tuntiObj={this.state.yksitunti} unmountMe={this.handleChildUnmountEdit} /> : null }
      </div>
      );

    } else if (this.state.visible==="deleteform") {
      return (<div className="box4">
        <h1 className="text-center">tuntistietojen poiston vahvistus</h1>
        <div className="text-center">
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildDelete ? <TunnitDelete tuntiObj={this.state.poistatunti} unmountMe={this.handleChildUnmountDelete} /> : null }
      </div>
      );

    }  else {
      return (<div className="box1">
        <h1>Sovellusvirhe - lataa sivu uudelleen!</h1>
      </div>
      );
    }
    

  }
}
export default Opettaja;