const Map = require('../models/map');
const axios = require('axios');
const excel = require('excel4node');

exports.add = async (req, res) => {
  console.log('body: ', req.body);
  const { city, street, number } = req.body;
  const map = new Map();
  if (city) map.city = city;
  if (street) map.street = street;
  if (number) map.number = number;

  let key = '&key=AIzaSyCJKkq5fQdA0OWZuWit11ppWltRJiH2ozk';
  if (city && number && street) {
    var uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${number}+${street},+${city}+${key}`;
    var latlongdata = await axios.get(encodeURI(uri));
    var latitude = latlongdata.data.results[0].geometry.location.lat;
    var longitude = latlongdata.data.results[0].geometry.location.lng;
    if (latitude) {
      map.lat = latitude;
    }
    if (longitude) {
      map.long = longitude;
    }
  }

  map.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.getall = (req, res) => {
  Map.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.getXls = async (req, res) => {
  console.log('xls');
  try {
    const latlng = await Map.find();
    console.log('latlng: ', latlng);
    if (latlng) {
      var workbook = new excel.Workbook();
      var worksheet = workbook.addWorksheet('Map ');
      // Create a reusable style
      var style = workbook.createStyle({
        font: {
          color: '#FF0800',
          size: 12,
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -',
      });
      latlng.map((u, i) => {
        worksheet
          .cell(i + 1, 1)
          .string(u.lat)
          .style(style);
        worksheet
          .cell(i + 1, 2)
          .string(u.long)
          .style(style);
        worksheet
          .cell(i + 1, 3)
          .string(u.city)
          .style(style);
        worksheet
          .cell(i + 1, 4)
          .string(u.street)
          .style(style);
      });

      await workbook.write('nir.xlsx');

      res.json({ data: users, status: 200 });
    } else {
      res.send({ message: 'No courses', status: 400 });
    }
  } catch (err) {
    res.send({ message: 'Server error', status: 500 });
  }
};
