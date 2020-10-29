import Axios from 'axios'
const url = '/api/login'

const loginUser = async (userInfo) => {
  const repsonse = await Axios.post(url, userInfo)
  return repsonse.data
}

export default { loginUser }
