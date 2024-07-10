import axios from "axios";

//definir base uRL axios de comunicacao com Back-end
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

//Intercepeta requisicao p/ setar token no header
axiosClient.interceptors.request.use((config) => {

    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`

    return config;
})

//Intercepeta resposta para remover token em caso de erro
axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    const { response } = error

    if(response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
    }

    throw error;
})


export default axiosClient;