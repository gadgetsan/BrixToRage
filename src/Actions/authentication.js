export function logIn(email, password) {
    return (dispatch, getState) => {
        var state = getState();
        var url = state.authURL + "login";
        //console.log("STARTED : " + url);
        //ensuite, on fait la requête
        fetch(url, {
            method: "POST",
            body: JSON.stringify({ email: email, password: password }),
            headers: {
                "Content-Type": "application/JSON"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                    //TODO: avertir qu'il y a eu une erreur...
                }
                return response;
            })
            .then(response => response.json())
            .then(user => {
                //on nous retourne le nouvel emplacement, qu'on va appeller une action
                //pour aller mettre à jour aux endroits appropriés
                //console.log(user);
                dispatch(loginSuccess(password, user));
            })
            .catch(err => {
                //TODO: avertir qu'il y a eu une erreur...
                console.log(err);
                dispatch(loginFailure());
            });
    };
}

export function loginSuccess(password, user) {
    return {
        type: "LOGIN_SUCCESS",
        password,
        user
    };
}
export function loginFailure() {
    return {
        type: "LOGIN_FAILURE"
    };
}
