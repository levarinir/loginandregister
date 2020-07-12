import React, { useState } from 'react';
import { isAuthenticated } from '../action/auth';
import { addNewMarker } from '../action/marker';

const AddMarker = ({ handleAddReview }) => {
  const { user } = isAuthenticated();

  const [values, setValues] = useState({
    city: '',
    street: '',
    number: '',
  });

  const { city, street, number } = values;

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values });

    const data = await addNewMarker({ city, street, number });

    if (data.error) {
      console.log('error!');
    } else {
      console.log('Add!');
      handleAddReview(true);
      setValues({
        city: '',
        street: '',
        number: '',
      });
      alert('Add!');
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>add address</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div>
              <input
                type="text"
                placeholder="city"
                name="city"
                value={city}
                onChange={(e) => onChange(e)}
                maxLength="50"
                required
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="street"
                name="street"
                value={street}
                onChange={(e) => onChange(e)}
                maxLength="50"
                required
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="number"
                name="number"
                value={number}
                onChange={(e) => onChange(e)}
                maxLength="50"
                required
              />
            </div>

            <div>
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default AddMarker;
