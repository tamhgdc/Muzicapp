import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
    },
})

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers['x-access-token'] = token
          config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config

    if (originalConfig.url !== 'api/Auth/signin' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post('api/Auth/refreshToken', {
            refreshToken: localStorage.getItem('refreshToken'),
          })

          const { success, accessToken } = rs.data
          if(!success){
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
          }else
            localStorage.setItem('token', accessToken)

          return instance(originalConfig)
        } catch (_error) {
          return Promise.reject(_error)
        }
      }
      // if (err.response.status === 403 && !originalConfig._retry) {

      //     localStorage.removeItem('token')
      //     localStorage.removeItem('refreshToken')
      //     return Promise.reject()
      // }
    }

    return Promise.reject(err);
  }
)

export default instance;