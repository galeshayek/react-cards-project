import axios from "axios"

const baseUrl = 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login'

export const LoginUser = (data: object) => axios.post(baseUrl, data)