import React, { Component } from 'react';

import UsersAdd from './UsersAdd';
// import usersEdit from './usersEdit';
import UsersDelete from './usersDelete';
import Table from 'react-bootstrap/Table';
import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';
import { userService } from '@/_services';

class UserFetch extends Component {

  constructor(props) {
    super(props);
    console.log("Opettaja-komponentti: constructor");
    this.state = { 
        user: [], 
        start: 0,
        take: 10,
        visible: "table",
        renderChildAdd: true,   
        renderChildEdit: true,
        renderChildDelete: true,
        yksiUser: [], 
        poistaUser: [], 
        UserID: '',
        UserID2Del: ''  
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

  HaeNWRestApista(){
    this.getAll().then(user => this.setState({ user }));
  }

  getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

  handleClickEdit = (dataObj, event) => {
    console.log("<<<<<<<<<<<<<handleClickEdit -- -- -- dataObj-tulostus>>>>", dataObj);
    //alert(event.type); //voidaan tutkia millainen React-eventti oli kyseessä (esim: "click")
    this.setState({
      yksiUser: dataObj, 
      visible: "editform", 
      renderChildEdit: true
    })
  }
  handleClickDelete = (dataObj, event) => {
    //console.log:ssa voi konkatenoida tekstin ja datan pilkulla ja pitääkin, jos haluaa tulostaa objektin sisällön 
    console.log("<<<<<<<<<<<<<handleClickDelete -- -- -- Poistan tunnuksen>>>>", dataObj); 
    alert("Poistan tunnuksen: " + dataObj.userId); //Alertissa konkatenointi tehdään plussalla + 
    this.setState({
      poistaUser: dataObj, 
      visible: "deleteform", 
      renderChildDelete: true
    })
  }
 
  componentDidMount() {
    this.HaeNWRestApista();
  }

  render() {
    console.log("Opettaja-komponentti: render");
    let viesti = "NW Käyttäjä-rivejä: " + this.state.user.length;
    let taulukko = [];
    //Luodaan taulukon otsikot
    let tHeaders=<tr><th></th><th>Nimi</th><th>Sähköposti</th><th>Salasana</th><th></th></tr>;
    if (this.state.user.length > 0) {
        for (let index = 0; index < this.state.user.length; index++) {
            const element = this.state.user[index];
            taulukko.push(<tr key={element.id}>
            <td><i className="fas fa-pencil-alt" onClick={this.handleClickEdit.bind(this, element)}></i></td>
            <td >{element.id}</td>
            <td>{element.firstName}</td>
                
            <td><i className="fas fa-trash-alt" onClick={this.handleClickDelete.bind(this, element)}></i></td>
            </tr>);
      }
    }
    else {
      viesti = "Ladataan tietoja Northwind-tietokannasta..."
    }
    //Ehdollinen return
    if (this.state.visible==="table") {
      return (<div className="box4">
        <h1 className="text-center">Tietokantahaku users</h1>
        <button onClick={this.handleClickHelp}>Näytä opaste</button>
        <button onClick={this.handleClickAdd}>Lisää User</button>
            <Table responsive="sm" className="table table-dark" id="t01">
              <thead>{tHeaders}</thead>
              <tbody>{taulukko}</tbody>
            </Table>
            <button  onClick={this.handleClickPrev}><i className="fas fa-angle-double-left"> Edelliset</i></button>
            <button onClick={this.handleClickNext}>Seuraavat <i className="fas fa-angle-double-right"></i></button>
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
        {this.state.renderChildAdd ? <UsersAdd unmountMe={this.handleChildUnmountAdd} /> : null }
      </div>
      );

    } else if (this.state.visible==="editform") {
      return (<div className="box4">
        <h1 className="text-center">Tuote tietojen muokkaus</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildEdit ? <UsersEdit UserObj={this.state.yksiUser} unmountMe={this.handleChildUnmountEdit} /> : null }
      </div>
      );

    } else if (this.state.visible==="deleteform") {
      return (<div className="box4">
        <h1 className="text-center">Userstietojen poiston vahvistus</h1>
        <div className="text-center">
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildDelete ? <UsersDelete UserObj={this.state.poistaUser} unmountMe={this.handleChildUnmountDelete} /> : null }
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
export default UserFetch;
