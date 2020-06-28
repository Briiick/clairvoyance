import axios from 'axios';

// establish instance for axios. 
// Axios is an HTTP client that allows us to make GET and POST requests from the browser.
const instance = axios.create({
	baseURL: 'http://localhost:3001',
	timeout: 1000,
	withCredentials: true
});

export default instance;