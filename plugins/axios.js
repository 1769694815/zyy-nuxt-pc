import qs from 'qs'
import { Base64 } from '~/assets/js/base64.js'

const clientId = 'zyy_Ios'
const clientSecret = 'DhOjYp6in5EnXtoZjWhbWg=='
const encodeStr = Base64.encode(clientId + ':' + clientSecret);

export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    config.data = qs.stringify(config.data, {
      allowDots: true //Option allowDots can be used to enable dot notation
    });
    return config;
  });
 
  $axios.onResponse(response => {
    return Promise.resolve(response.data);
  });
 
  $axios.onError(error => {
    return Promise.reject(error);
  });

  $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
  $axios.setHeader('Authorization', 'Basic' + ' ' + encodeStr)
}
// axios.defaults.baseURL = 'http://212.64.79.36:8080'