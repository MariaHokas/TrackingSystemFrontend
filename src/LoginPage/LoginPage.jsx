import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Logo from '../images/Careeria_logo_valkoinen.png';
import { authenticationService } from '@/_services';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/');
        }
    }
    render() {
        return (
            <div className="login">
            <div className="login_inner">
                <h2>Login</h2>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Username is required'),
                        password: Yup.string().required('Password is required')
                    })}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        console.log(username, password)
                        setStatus();
                        authenticationService.login(username, password)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-warning" disabled={isSubmitting}>Login</button>
                                {isSubmitting &&
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Google_Keep_icon.svg" alt="mikä tämä on?" />
                                }
                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                            
                        </Form>
                        
                    )}
                ></Formik>  
                </div>  
                <img className="logo" src={Logo} alt="mikä tämä on?" />           
            </div>            
        )
    }
}

export { LoginPage };