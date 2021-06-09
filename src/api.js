
import axios from 'axios'
const URL = 'http://localhost:8080';
const API = '/api/v1';
const api = axios.create({
	baseURL: URL + API,
});

api.interceptors.request.use( (request) => {
	request.headers.Authorization =  localStorage.getItem("TOKEN_KEY");
	return request;
});

export default api;