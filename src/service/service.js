import axios from 'axios'
import config from '../config'
import { getSessionStorage } from '../utils/base'

class Service {
  login (params) {
    return axios({
      url: `${config.service.host}/user/login`,
      method: 'post',
      params: params
    })
  }

  requestUrl (paramArr) {
    const url = `${config.service.host}${paramArr.url}`
    const method = paramArr.method ? paramArr.method : 'POST'
    const data = paramArr.data ? paramArr.data : ''

    return new Promise((resolve, reject) => {
      axios({
        url: url,
        method: method,
        data: data,
        headers: {
          authKey: getSessionStorage('authKey')
        }
      }).then(res => {
        const data = res.data
        if (data.status === '0x5002') {
          location.hash = '/login'
        } else {
          resolve(data.data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}

const service = new Service()
export default service
