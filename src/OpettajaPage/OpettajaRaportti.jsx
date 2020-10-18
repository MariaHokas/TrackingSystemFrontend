import React, { Component } from 'react';
import TunnitAdd from './TunnitAdd';
import TunnitDelete from './TunnitDelete';
import TunnitEdit from './TunnitEdit';
import Table from 'react-bootstrap/Table';
import moment from 'moment';


class OpettajaRaportti extends Component {


  constructor(props) {
    super(props);
    // console.log("Opettaja-komponentti: constructor");
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

  handleChildUnmountAdd() {
    this.setState({ renderChildAdd: false });
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleChildUnmountEdit() {
    this.setState({ renderChildEdit: false });
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleChildUnmountDelete() {
    this.setState({ renderChildDelete: false });
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleClickTable = () => {
    this.setState({ visible: "table" })
  }

  handleClickAdd = () => {
    this.setState({ visible: "addform", renderChildAdd: true })
  }

  handleClickPrev = () => {
    let startvalue = this.state.start;
    if (startvalue > 0) {
      startvalue = startvalue - 10;
    }
    this.setState({ start: startvalue }, this.handleSubmit);
  }

  handleClickNext = () => {
    this.setState({ start: this.state.start + 10 }, this.handleSubmit);
  }

  handleClickListByLength = () => {
    this.setState({ take: 11 }, this.handleSubmit)
  }

  handleSubmit() {
    this.HaeNWRestApista();
  }

  HaeNWRestApista() {
    let uri = 'http://localhost:4000/api/opettaja/r?offset=' + this.state.start + '&limit=' + this.state.take;
    // let uri = 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/customer/r?offset='+this.state.start+'&limit='+this.state.take;
    // console.log("HaeOmaRestistä " + uri);
    fetch(uri)
      .then(response => response.json())
      .then(json => {
        // console.log(json);
        this.setState({ tunnit: json }); //Viedään tulosjoukko (json) setState-komennolla tunnit -olioon
      });
  }

  handleClickEdit = (dataObj, event) => {
    // console.log("<<<<<<<<<<<<<handleClickEdit -- -- -- dataObj-tulostus>>>>", dataObj);
    //alert(event.type); //voidaan tutkia millainen React-eventti oli kyseessä (esim: "click")
    this.setState({
      yksitunti: dataObj,
      visible: "editform",
      renderChildEdit: true
    })
  }
  handleClickDelete = (dataObj, event) => {
    alert("Poistan tunnuksen: " + dataObj.tunnitId);
    this.setState({
      poistatunti: dataObj,
      visible: "deleteform",
      renderChildDelete: true
    })
  }

  componentDidMount() {
    this.HaeNWRestApista();
  }

  render() {
    let viesti = "Rivejä näytetään: " + this.state.tunnit.length;
    let taulukko = [];
    let tHeaders = <tr><th></th><th>ID</th><th>Nimi</th><th>Luokkahuone</th><th>Sisään</th><th>Ulos</th><th></th></tr>;
    if (this.state.tunnit.length > 0) {
      for (let index = 0; index < this.state.tunnit.length; index++) {
        const element = this.state.tunnit[index];
        taulukko.push(<tr key={element.tunnitId}>
          <td><i className="fas fa-pencil-alt" onClick={this.handleClickEdit.bind(this, element)}></i></td>
          <td >{element.tunnitId}</td>
          <td>{element.oppilasName}</td>
          <td>{element.luokkahuoneNimi}</td>
          <td>{moment(new Date(element.sisaan)).format("DD.MM.YYYY hh:mm a")}</td>
          <td>{moment(new Date(element.ulos)).format("DD.MM.YYYY hh:mm a")}</td>
          <td><i className="fas fa-trash-alt" onClick={this.handleClickDelete.bind(this, element)}></i></td>
        </tr>);
      }
    }
    else {
      viesti = "Ladataan tietoja Northwind-tietokannasta..."
    }
    //Ehdollinen return
    if (this.state.visible === "table") {
      return (<div className="raportimg">
        <h1 className="text-center">Tietokantahaku opettaja</h1>
        <button onClick={this.handleClickAdd}>Lisää tunti</button>
        <button onClick={this.handleClickListByLength}><i className="fas fa-bars"> Näytä koko listaus</i></button>
        <Table responsive="md">
          <thead>{tHeaders}</thead>
          <tbody>{taulukko}</tbody>
        </Table>
        <button onClick={this.handleClickPrev}><i className="fas fa-angle-double-left"> Edelliset</i></button>
        <button onClick={this.handleClickNext}>Seuraavat <i className="fas fa-angle-double-right"></i></button>
        <p>{viesti}</p>
      </div>
      );
    } else if (this.state.visible === "addform") {
      return (<div className="box4">
        <h1 className="text-center">Uuden käyttäjän lisäys</h1>
        <div>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildAdd ? <TunnitAdd unmountMe={this.handleChildUnmountAdd} /> : null}
      </div>
      );

    } else if (this.state.visible === "editform") {
      return (<div className="box4">
        <h1 className="text-center">Tuote tietojen muokkaus</h1>
        <div>
          <button onClick={this.handleClickTable}>Takaisin tuntilistalle</button>
        </div>
        {this.state.renderChildEdit ? <TunnitEdit tuntiObj={this.state.yksitunti} unmountMe={this.handleChildUnmountEdit} /> : null}
      </div>
      );

    } else if (this.state.visible === "deleteform") {
      return (<div className="box4">
        <h1 className="text-center">tuntistietojen poiston vahvistus</h1>
        <div className="text-center">
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildDelete ? <TunnitDelete tuntiObj={this.state.poistatunti} unmountMe={this.handleChildUnmountDelete} /> : null}
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
export default OpettajaRaportti;