import axios from 'axios'
const NPS_base_url = 'https://developer.nps.gov/api/v1/';
const api_key = 'api_key=os9gdUMtfjWN14L4zo5a33m7m4beCQAC1xrZAjh9';

class NPSService {
    getParkInfo(){
        return axios.get(NPS_base_url + "parks?limit=500&" + api_key);
    }
}



export default new NPSService();