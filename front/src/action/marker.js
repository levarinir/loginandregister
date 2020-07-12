import { API } from '../config';

export const addNewMarker = async (values) => {
  try {
    const res = await fetch(`${API}/marker/add`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getAllMarkers = async () => {
  try {
    const res = await fetch(`${API}/all`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const exportToXls = async () => {
  try {
    const res = await fetch(`${API}/allToXls`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};
