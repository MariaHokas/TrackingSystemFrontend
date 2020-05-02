import React, { Component } from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import { authHeader, handleResponse } from '@/_helpers';
import { userService, authenticationService } from '@/_services';




class Dropdown1 extends Component {
  //   state = {
  //     luokat: [],
  //     selectedLuokka: "",
  //     validationError: ""
  //   };

  //   componentDidMount() {
  //     fetch("http://localhost:4000/api/luokat")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       let luokatFromApi = data.map(luokka => {
  //         return {value: luokka, display: luokka}
  //       });
  //       this.setState({
  //         luokat: [{value: '', display: '(Select your favourite team)'}].concat(luokatFromApi)
  //       });
  //     }).catch(error => {
  //       console.log(error);
  //     });

  //   }

  //   render() {
  //     return (
  //       <div>
  //       <div>
  //         <select value={this.state.selectedLuokka}              
  //                  onChange={e => this.setState({selectedTeam: e.target.value,validationError: e.target.value === "" ? "You must select your favourite team" : ""})}>
  //                 {this.state.luokat.map((luokka) => <option key={luokka.value} value={luokka.value}>{luokka.display}</option>)}</select>
  //       </div>
  //       <div style={{color: 'red', marginTop: '5px'}}>{this.state.validationError}</div>
  //       </div>
  //     );
  //   }
  // }
  constructor(props) {
    super(props);
    console.log("Opettaja-komponentti: constructor");
    this.state = {
      luokat: [],
    };
  };


  opettajaGetAll() {
    const uri = 'http://localhost:4000/api/luokat';
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(uri, requestOptions).then(handleResponse);
  }

  componentDidMount() {
    this.opettajaGetAll().then(luokat => this.setState({ luokat }));
  }

  render() {

    const { luokat } = this.state;
    console.log('Render', luokat);
    //Ehdollinen return

    return (
      <div className="box4 kello_page">
        <h1 className="text-center">Tietokantahaku luokat</h1>
        <select>
          {luokat.map(tunti =>
            <option key={tunti.luokkahuoneId}
              value={tunti.luokkahuoneId}>{tunti.luokkaNimi}</option>
          )}
        </select>
      </div>
    );
  }
}

export default Dropdown1;