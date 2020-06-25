import axios from 'axios'

export default (token=null) => {
    if (token) {
        return axios.create({
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer '.concat(token)
            }
        })
    } else {
        return axios
    }
}