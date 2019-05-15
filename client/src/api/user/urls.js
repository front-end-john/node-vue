import baseUrl from '../baseUrl'

const url = `${baseUrl}/user`
const user = {
  queryByAll: `${url}/queryByAll`,
  addUser: `${url}/addUser`,
  deleteUser: `${url}/deleteUser`,
  updateUser: `${url}/updateUser`,
  queryUser: `${url}/queryUser`
}
export default {
  user
}
