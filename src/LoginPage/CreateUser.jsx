import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authenticationService } from '@/_services';
import { userService } from '@/_services';


class CreateUser extends Component {

    render() {
        return (
            <Formik
                initialValues={{
                   
                    firstname: '',
                    lastname: '',
                    username: '',
                    role: '',
                    password: '',
                    confirmPassword: '', 
                       
                }}
                validationSchema={Yup.object().shape({
                    
                    firstname: Yup.string()
                        .required('Firstname is required'),
                    lastname: Yup.string()
                        .required('Lastname is required'),
                    username: Yup.string()
                        .required('Username is required'),
                    password: Yup.string()
                        .min(4, 'Password must be at least 6 characters')
                        // .matches(/[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/i,'invalid Password')
                        .required('Password is required'),
                    confirmPassword:  Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required')
                   
                    
                })            
            }               
            onSubmit={({ firstname, username, password }, { setStatus, setSubmitting }) => {
                console.log(firstname, username, password)
                const user = [firstname, username, password]
                setStatus();
                authenticationService.register(user)
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
                        <div className="login_inner">
                         <div className="form-group">
                            <label htmlFor="firstname">Firstname</label>
                            <Field name="firstname" type="text" className={'form-control' + (errors.firstname && touched.firstname ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstname" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Lastname</label>
                            <Field name="lastname" type="text" className={'form-control' + (errors.lastname && touched.lastname ? ' is-invalid' : '')} />
                            <ErrorMessage name="lastname" component="div" className="invalid-feedback" />
                        </div>
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
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                                {isSubmitting &&
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Google_Keep_icon.svg" alt="mikä tämä on?" />
                                }
                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                            </div>
                    </Form>
                )}
            ></Formik>
        )
    }
}

export { CreateUser };