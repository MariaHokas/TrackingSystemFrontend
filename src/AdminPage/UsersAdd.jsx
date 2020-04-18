import React, { Component } from 'react';
import { authHeader, handleResponse } from '@/_helpers';


class UsersAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { userID: '', FirstName: '', LastName: '', Username: '', Role: '', Password: ''};
        this.handleChangeuserID = this.handleChangeuserID.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeRole = this.handleChangeRole.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    dismiss() {
        console.log("Ollaan NWLoginAdd -dismiss()-rutiinissa - - - - - - ");
        this.props.unmountMe();
    }

    handleChangeuserID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, userID: syöte.toUpperCase() });
    }
    handleChangeFirstName(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, FirstName: syöte });
    }
    handleChangeLastName(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, LastName: syöte });
    }c
    handleChangeUsername(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Username: syöte });
    }
    handleChangeRole(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Role: syöte });
    }
    handleChangePassword(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Password: syöte });
    }

    handleSubmit(event) {
        alert('Lähetettiin user: ' + this.state.FirstName + ' ' + this.state.LastName);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    InsertoiKantaan() {
        // Luodaan userobjekti, johon haetaan state:sta tiedot                     
        const user = {
            userID: this.state.userID,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Username: this.state.Username,
            Role: this.state.Role,
            Password: this.state.password,

        };
        
        // send an asynchronous request to the backend
        const userJson = JSON.stringify(user);
        console.log("userJson = " + userJson);
        
        const apiUrl = 'http://localhost:4000/users/register';
        //    const apiUrl= 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/logins';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        fetch(apiUrl, {
            method: "POST",
            headers: {
                requestOptions
            },
        }).then((response) => response.json())
            .then((json) => {
                // store the data returned from the backend to the current state
                const success = json;
                console.log(`Response from server: ${success}.`);
                if (success) {
                    console.log("Pyyntö tunnuksen tallettamiseksi tehty -- -- -- -- --");
                    this.dismiss();
                }
            });
        }

    render()
     {
        return (
            <div>
                <form className="box3" onSubmit={this.handleSubmit}>
                
                    <input type="text" placeholder="FirstName" onChange={this.handleChangeFirstName} />
                    <input type="text" placeholder="LastName" onChange={this.handleChangeLastName} />
                    <input type="text" placeholder="Username" onChange={this.handleChangeUsername} /> 
                    <input type="text" placeholder="Role" onChange={this.handleChangeRole} /> 
                    <input type="password" placeholder="password" onChange={this.handleChangePassword} /> 
                                  
                    <br />
                
                    <button type="submit">Tallenna</button>
                </form>
            </div>
        );
    }
}
export default UsersAdd;