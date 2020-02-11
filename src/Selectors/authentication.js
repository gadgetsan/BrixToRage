export function getUser(state) {
    return state.user;
}

export function isLogged(state) {
    return state.user.authenticated === true;
}
