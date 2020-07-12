import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { signup, authenticate } from '../action/auth';

import '../App.css';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    checkpassword: '',
    error: '',
    success: false,
    loading: false,
    redirectToReferrer: false,
  });

  const {
    email,
    password,
    checkpassword,
    success,
    error,
    loading,
    redirectToReferrer,
  } = values;

  let history = useHistory();

  const onChange = (e) => {
    setValues({ ...values, error: false, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });

    const data = await signup({ email, password });

    if (data.error) {
      setValues({ ...values, error: data.error, loading: false });
    } else {
      authenticate(data, () => {
        setValues({ ...values, redirectToReferrer: true });
      });
    }
  };

  const showError = () => (
    <div style={{ display: error ? '' : 'none' }}>{error}</div>
  );

  const showSuccess = () => (
    <div className="show-success" style={{ display: success ? '' : 'none' }}>
      נוצר חשבון משתמש חדש, בבקשה התחבר
    </div>
  );

  const redirectUser = () => {
    if (redirectToReferrer) {
      history.goBack();
      return <Redirect to="/" />;
    }
  };

  return (
    <section className="signup">
      {showSuccess()}
      {showError()}
      <div className="signup-container">
        <form className="signup-form" onSubmit={(e) => onSubmit(e)}>
          <h1>הרשמה</h1>

          <div className="signup-row">
            <input
              type="email"
              placeholder="מייל"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              maxLength="50"
              className="input-email"
              required
            />
          </div>
          <div className="signup-row">
            <input
              type="password"
              placeholder="סיסמה"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              maxLength="30"
              className="input-password"
              required
            />
          </div>
          <div className="signup-row">
            <input
              type="password"
              placeholder="סיסמה חוזרת"
              name="checkpassword"
              value={checkpassword}
              onChange={(e) => onChange(e)}
              minLength="6"
              maxLength="30"
              className="input-password"
              required
            />
          </div>
          <div className="signup-row">
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

export default Signup;
