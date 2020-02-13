export function initUser(state, action) {
    if (state["user"] === undefined) {
        var toReturn = { ...state };
        toReturn.user = {};
        toReturn.authURL = "https://multibackend.herokuapp.com/auth/";
        if (document.domain === "pj2yjq46qx.csb.app") {
            toReturn.authURL = "https://21sle.sse.codesandbox.io/auth/";
        }
        return toReturn;
    } else {
        return state;
    }
}

export function authenticating(state, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            var newState = JSON.parse(JSON.stringify(state));
            newState.user = action.user;
            newState.user.password = action.password;
            newState.user.authenticated = true;
            console.log(newState.user);
            return newState;
        default:
            return state;
    }
}
