import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';

import { register } from '../slices/auth';
import { clearMessage } from '../slices/message';

const Register = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: '',
    nickname: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        'len',
        'The userid must be between 3 and 20 characters.',
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20,
      )
      .required('This field is required!'),
    nickname: Yup.string()
      .test(
        'len',
        'The nickname must be between 2 and 20 characters.',
        (val) =>
          val && val.toString().length >= 2 && val.toString().length <= 20,
      )
      .required('This field is required!'),
    // email: Yup.string()
    //   .email('This is not a valid email.')
    //   .required('This field is required!'),
    password: Yup.string()
      .test(
        'len',
        'The password must be between 6 and 40 characters.',
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40,
      )
      .required('This field is required!'),
    retypepassword: Yup.string()
      .test(
        'len',
        'The retypepassword must be between 6 and 40 characters.',
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40,
      )
      .required('This field is required!')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const handleRegister = (formValue) => {
    const { username, nickname, password } = formValue;

    setSuccessful(false);

    dispatch(register({ username, nickname, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className="align-items-center" style={{ marginTop: '15px' }}>
      <div className="card card-container align-items-center">
        <div
          className="card card-container align-items-center"
          style={{ width: '350px', padding: '15px', marginTop: '15px' }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="username">UserId</label>
                    <Field
                      name="username"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="nickname">Nickname</label>
                    <Field
                      name="nickname"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="nickname"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  {/* <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div> */}

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="retypepassword">Retype Password</label>
                    <Field
                      name="retypepassword"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="retypepassword"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign Up
                    </button>
                  </div>
                </div>
              )}
            </Form>
          </Formik>
          <div className="text-center mt-4 font-weight-light">
            Already have an account?{' '}
            <NavLink
              to={'/login'}
              className="nav-link"
              activeClassName="active"
            >
              Login
            </NavLink>
          </div>
        </div>

        {message && (
          <div className="form-group">
            <div
              className={
                successful ? 'alert alert-success' : 'alert alert-danger'
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
