import Axios from 'axios'
const url = `http://localhost:3001/persons`

const getContacts = () => {
  return Axios.get(url).then(response => response.data)
}
const createContact = personObject => {
  return Axios.post(url, personObject).then(response => response.data)
}

export default {
  getContacts,
  createContact
}