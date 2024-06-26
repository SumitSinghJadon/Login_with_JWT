import axios from 'axios';

const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
  };

  
const api = axios.create({
    baseURL: 'http://localhost:8000/',  
    timeout: 5000,  
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(
    config => {
        const token = getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
            console.log("originalRequest =",originalRequest)
  
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
        
          const refreshToken = getRefreshToken();
          console.log("refreshToken =", refreshToken)
          const response = await api.post('http://localhost:8000/api/token/refresh/', {
            refresh: refreshToken,
          });
           console.log("response_data",response.data)
          const { access }  = response.data;
          if (!access) {
            throw new Error('New access token not found in response');
          }

          localStorage.setItem('access_token', access);
  
         
          originalRequest.headers['Authorization'] = `Bearer ${access}`;
  

          return api(originalRequest);
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError);
    
        }
      }
  
      return Promise.reject(error);
    }
  );
export default api;
