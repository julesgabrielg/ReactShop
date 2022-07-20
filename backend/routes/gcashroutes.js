import React from 'react';
import axios from 'axios';


export default function Gcashroutes() {
const options = {
  method: 'POST',
  url: 'https://api.paymongo.com/v1/sources',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Basic cGtfdGVzdF90UGg3RHdzdjVBSGJLb3F2c3U5TmVIZW86c2tfdGVzdF9WbWJxamdHd3dLREZrUkpGNXY5MjNkdlE='
  },
  data: {
    data: {
      attributes: {
        amount: 10000,
        redirect: {
          success: 'https://localhost:3000/success.js',
          failed: 'https://localhost:3000/failed.js'
        },
        type: 'gcash',
        currency: 'PHP'
      }
    }
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
}
