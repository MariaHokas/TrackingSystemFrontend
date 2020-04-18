import React, { Component } from 'react';

import { userService } from '@/_services';
import Table from 'react-bootstrap/Table';
import { authHeader, handleResponse } from '@/_helpers';
import config from 'config';
import UsersDelete from './usersDelete';

class AdminPage extends Component {

 

    constructor(props) {
        super(props);

        this.state = { 
            users: [], 
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
        console.log("Ollaan user -handleChildUnmountAdd-rutiinissa - - - - - - ");
        this.setState({renderChildAdd: false});
        this.handleClickTable();
        this.HaeNWRestApista();
      }
    
      handleChildUnmountEdit(){
        console.log("Ollaan user -handleChildUnmountEdit-rutiinissa - - - - - - ");
        this.setState({renderChildEdit: false});
        this.handleClickTable();
        this.HaeNWRestApista();
      }
    
      handleChildUnmountDelete(){
        console.log("Ollaan user -handleChildUnmountDelete-rutiinissa - - - - - - ");
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
        this.getAll().then(users => this.setState({ users }));
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
        alert("Poistan tunnuksen: " + dataObj.userID); //Alertissa konkatenointi tehdään plussalla + 
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
        const { users } = this.state;
        if (this.state.visible==="table") {
            return (<div className="box4">
                <h1>Käyttäjä hallinta</h1>                               
                    {users &&
                    <Table>
                         <thead><tr><th></th><th>User</th><th>Username</th><th>Role</th><th></th></tr></thead>
                        <tbody>                                                      
                            {users.map(user =>                           
                                <tr key={user.id}>
                                <td><i className="fas fa-pencil-alt"></i></td>
                                <td>{user.firstName} {user.lastName}</td>   
                                <td>{user.username}</td>
                                <td>{user.role}</td>  
                                <td><i className="fas fa-trash-alt" onClick={this.handleClickDelete.bind(this, user)}></i></td>                                
                            </tr>
                            )}
                        </tbody>
                    </Table>
                    }         
            </div>
        );
    }else if (this.state.visible==="deleteform") {
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

export { AdminPage };