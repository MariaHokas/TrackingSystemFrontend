import React, { Component } from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import { authHeader, handleResponse } from '@/_helpers';
import { userService, authenticationService } from '@/_services';




class Dropdown1 extends Component {
  //   state = {
  //     users: [],
  //     selectedLuokka: "",
  //     validationError: ""
  //   };

  //   componentDidMount() {
  //     fetch("http://localhost:4000/api/users")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       let usersFromApi = data.map(luokka => {
  //         return {value: luokka, display: luokka}
  //       });
  //       this.setState({
  //         users: [{value: '', display: '(Select your favourite team)'}].concat(usersFromApi)
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
  //                 {this.state.users.map((luokka) => <option key={luokka.value} value={luokka.value}>{luokka.display}</option>)}</select>
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
      users: [],
      selectedTeam: ''
    };
  };


  usersGetAll() {
    const uri = 'http://localhost:4000/api/helpers/user';
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(uri, requestOptions).then(handleResponse);
  }

  componentDidMount() {
    this.usersGetAll().then(users => this.setState({ users }));

  }

  render() {  
    //Ehdollinen return
    return (
      <div className="box4 kello_page">
        <h1 className="text-center">Tietokantahaku users</h1>
        <select>
          {this.state.users.map(user =>
            <option key={user.id}
              value={user.id}>{user.name}</option>
          )}
        </select>
      </div>
    );
  }
}

export default Dropdown1;