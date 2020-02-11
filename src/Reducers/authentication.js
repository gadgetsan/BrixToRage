export function initUser(state, action) {
    if (state["user"] === undefined) {
        var toReturn = { ...state };
        toReturn.user = {};
        return toReturn;
    } else {
        return state;
    }
}

export function authenticating(state, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            var newState = JSON.parse(JSON.stringify(state));
            console.log("authenticated? " + newState.user.authenticated);
            newState.user.authenticated = true;
            console.log("authenticated! " + newState.user.authenticated);
            return newState;
        default:
            return state;
    }
}
