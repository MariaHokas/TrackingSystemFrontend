import React, { Component } from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import { authHeader, handleResponse } from '@/_helpers';
import { userService, authenticationService } from '@/_services';

class OppilasRaportti extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tunnit: [],
      visible: "table",
      currentUser: authenticationService.currentUserValue
    };
  }

  handleClickTable = () => {
    this.setState({ visible: "table" })
  }

  handleSubmit() {
    this.HaeNWRestApista();
  }

  HaeNWRestApista() {
    this.opettajaGetAll().then(tunnit => this.setState({ tunnit }));
  }

  opettajaGetAll() {
    const uri = 'http://localhost:4000/api/oppilas/r';
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(uri, requestOptions).then(handleResponse);
  }

  componentDidMount() {
    this.opettajaGetAll().then(tunnit => this.setState({ tunnit }));
    const { currentUser } = this.state;
    userService.getById(currentUser.id);
    console.log(currentUser.userId)
  }

  render() {
    const { tunnit } = this.state;
    const { currentUser } = this.state;
    console.log('Render', tunnit);
    if (this.state.visible === "table") {
      return (
        <div className="raportimg">
          <h1 className="text-center">Tuntiraportti</h1>
          <div>
            {tunnit && currentUser &&
              <Table responsive="md">
                <thead><tr><th>Oppilas</th><th>luokkahuone</th><th>Sisään</th><th>Ulos</th></tr></thead>
                <tbody>
                  {tunnit.filter(tunti => tunti.userId === currentUser.id).map(tunti =>
                    <tr key={tunti.tunnitId}>
                      <td>{tunti.oppilasName}</td>
                      <td>{tunti.luokkahuoneNimi}</td>
                      <td>{moment(new Date(tunti.sisaan)).format("DD.MM.YYYY hh:mm:ss a")}</td>
                      <td>{moment(new Date(tunti.ulos)).format("DD.MM.YYYY hh:mm:ss a")}</td>
                    </tr>)}
                </tbody>
              </Table>
            }
          </div>
        </div>
      );
    } else {
      return (<div className="box1">
        <h1>Sovellusvirhe - lataa sivu uudelleen!</h1>
      </div>
      );
    }
  }
}
export default OppilasRaportti;