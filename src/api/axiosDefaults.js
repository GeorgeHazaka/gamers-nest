import axios from "axios";

axios.defaults.baseURL = 'https://drf-api-post-3b40e28fbca7.herokuapp.com/';
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;