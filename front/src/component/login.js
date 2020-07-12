import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../action/auth';

import './../App.css';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const onChange = (e) => {
    setValues({ ...values, error: false, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    const data = await signin({ email, password });
    if (data.error) {
      setValues({ ...values, error: data.error, loading: false });
    } else {
      authenticate(data, () => {
        setValues({ ...values, redirectToReferrer: true });
      });
    }
  };

  const showError = () => <div>{error}</div>;

  const showLoading = () =>
    loading && (
      <div className="show-loading">
        <h2>טוען...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user) {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <section className="signin">
      {showLoading()}
      {showError()}
      <div className="signin-container">
        <form className="signin-form" onSubmit={(e) => onSubmit(e)}>
          <h1>התחברות</h1>
          <div className="signin-row">
            <input
              type="email"
              placeholder="מייל"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              maxLength="30"
              required
            />
          </div>
          <div className="signin-row">
            <input
              type="password"
              placeholder="סיסמה"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              maxLength="30"
              required
            />
          </div>

          <div className="signin-row">
            <button type="submit" className="btn-submit">
              כניסה
            </button>
          </div>
        </form>
      </div>

      {redirectUser()}
    </section>
  );
};

export default Signin;
