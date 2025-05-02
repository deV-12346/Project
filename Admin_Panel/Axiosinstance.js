import axios from "axios"
const instance = axios.create({
      baseURL:"http://localhost:5000",
      timeout:5000
})
instance.interceptors.request.use(
      async(config)=>{
            try {
                  const token = localStorage.getItem("token")
                  if(!token){
                        console.log("Token not found")
                  }
                  if(token){
                        config.headers.Authorization = `Bearer ${token}`
                  }
                  return config
            } catch (error) {
                  console.log("error",error)
            }
      }
)
instance.interceptors.response.use(
      (response)=>{
            console.log("response data:",response)
            return response
      },
      (error)=>{
            if(error?.response){
                  console.log(error?.response?.data?.message)
                  return Promise.reject(new Error(error?.response?.data?.message));  
      }
     }
)
export default instance