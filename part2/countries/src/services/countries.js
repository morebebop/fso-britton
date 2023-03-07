import axios from "axios";

const getAll = () => {
    return axios.get('https://restcountries.com/v3.1/all')
}

export default {getAll}