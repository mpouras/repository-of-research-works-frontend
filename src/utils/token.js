import { ref } from 'vue';

const tokenName = "auth-token";

const authToken = ref(localStorage.getItem(tokenName));

function setToken(token) {
    localStorage.setItem(tokenName, token);
    authToken.value = token;
}

function removeToken() {
    localStorage.removeItem(tokenName);
    authToken.value = null;
}

export {
    authToken,
    setToken,
    removeToken,
}
