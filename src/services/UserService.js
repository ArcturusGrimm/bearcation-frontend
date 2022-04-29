import axios from 'axios'

const USERS_REST_API_URL = 'https://bearcation-backend.herokuapp.com/user/users';

class UserService {
    getUsers(){
        return axios.get(USERS_REST_API_URL);
    }
}



export default new UserService();