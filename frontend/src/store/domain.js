import axios from 'axios'
const axios_instance = axios.create({
    baseURL:"http://localhost:8000/",
    withCredentials:true,
})
export default axios_instance