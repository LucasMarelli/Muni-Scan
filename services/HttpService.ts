import axios from "axios";

const httpService = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});

httpService.interceptors.response.use(res => {
    const error = res.data?.error
    //Esto es por que desde appscripts hasta el momento no se pueden devolver status code de error 400, 500, etc
    // Por lo tanto se envía un objeto con el error.
    if (error) {
        throw new Error(error)
    }
    return res
})

export default httpService
