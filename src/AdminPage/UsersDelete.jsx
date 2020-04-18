import React, { Component } from 'react';
import { authHeader, handleResponse } from '@/_helpers';


class UsersDelete extends Component {
    constructor(props) {
        super(props);
        this.state = { userObj: [], userID: '', FirstName: '', LastName: ''};
        this.handleChangeUserID = this.handleChangeUserID.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePerformDelete = this.handlePerformDelete.bind(this);
    }
    dismiss() {
        console.log("Ollaan NWCustomerDelete -dismiss()-rutiinissa - - - - - - ");
        this.props.unmountMe();
    }
    handleChangeUserID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, UserID: syöte });
    }
    handleChangeFirstName(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, FirstName: syöte });
    }
    handleChangeLastName(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, LastName: syöte });
    }
    handleSubmit(event) {
        alert('Lähetettiin user: ' + this.state.LastName);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    callBackRoutine() {
        console.log('NWCustomerDelete: . . . . callBackRoutine >>>---' + this.state.userObj.UserID);
    }

    componentDidMount() {
        console.log("NWCustomerDelete-componentDidMount this.props.userObj: " + this.props.userObj.UserID);
        this.setState({
            userID: this.props.userObj.userID,
            FirstName: this.props.userObj.FirstName,
            LastName: this.props.userObj.LastName
        }
        );
        //Tutkitaan onko arvo null --> jos ei, niin viedään se stateen
        if (this.props.userObj.city) { this.setState({ City: this.props.userObj.city }); };
        if (this.props.userObj.country) {
            this.setState({ Country: this.props.userObj.country });
        };
    }

    handlePerformDelete(event) {
        console.log('NWCutomerDelete . handlePerformDelete . . . . delete:ssä', this.state.UserID);
        event.preventDefault();
        this.NWDeleteRestApista();
    }

    ResetDeleteDone() {
        console.log('ResetDeleteDone ???????????????');
        this.setState({
            UserID: '',
        })
        this.handleClickTable();
        this.HaeNWRestApista();
    }

    NWDeleteRestApista() {
        let apiUrl = 'http://localhost:4000/users/' + this.state.userID;
        // let apiUrl = 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/customer/'+this.state.User;
        console.log("NWDeleteRestApista " + apiUrl);
        const requestOptions = { method: "DELETE", headers: authHeader(), body: null };
        return fetch(apiUrl, requestOptions).then(handleResponse);
    }

    render() {
        return (
            <form className="box3" onSubmit={this.handlePerformDelete}>
                <table id="deletetbl">
                    <tbody>
                        <tr><td className="otsikko">user:</td><td>{this.state.userID}</td></tr>
                        <tr><td className="otsikko">FirstName:</td><td>{this.state.FirstName}</td></tr>
                        <tr><td className="otsikko">LastName:</td><td>{this.state.LastName} </td></tr>
                    </tbody>
                </table>
                <br />
                <button type="submit">Vahvista poisto</button>
            </form>
        );
    }
}
export default UsersDelete;