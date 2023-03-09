import axios from 'axios'
// assigning baseUrl the value of the backend server address
const baseUrl = 'http://localhost:3001/api/persons'

const create = (newPerson) => {return axios.post(baseUrl, newPerson)}

const getAll = () => {return axios.get(baseUrl)}

const update = (id, newPerson) => {return axios.put(`${baseUrl}/${id}`, newPerson)}

const remove = (id) => {return axios.delete(`${baseUrl}/${id}`)}

export default {getAll, create, update, remove}