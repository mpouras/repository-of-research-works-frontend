import { toast } from "vue3-toastify";

const login = (message) => {
    toast.success(message)
}

const register = (message) => {
    toast.success(message);
}

const logout = (message) => {
    toast.info(message)
}

export {
    login,
    register,
    logout,
}