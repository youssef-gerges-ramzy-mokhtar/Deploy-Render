import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data);
}

const create = newObject => {
    const req = axios.post(baseUrl, newObject)
    return req.then(req => req.data);
}

const update = (newObject) => {
    const req = axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return req.then(req => req.data);
}

export default {getAll, create, update}