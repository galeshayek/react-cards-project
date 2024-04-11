import axios from "axios";

const baseUrl = 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2';

export function postUser(data: object) {
    return axios.post(`${baseUrl}/users`, data)
}
