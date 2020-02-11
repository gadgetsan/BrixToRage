export function logIn(something, somethingElse) {
    return (dispatch, getState) => {
        console.log("IN ACTION!!");
        //THIS IS REALLy TEMPORARY, it is better than having it fully open imo
        if (something === "test@test.com" && somethingElse === "12345") {
            dispatch(loginSuccess());
        } else {
            dispatch(loginFailure());
        }
    };
}

export function loginSuccess() {
    return {
        type: "LOGIN_SUCCESS"
    };
}
export function loginFailure() {
    return {
        type: "LOGIN_FAILURE"
    };
}
