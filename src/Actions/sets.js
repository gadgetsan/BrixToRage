import { authFromUser } from "Shared/helpers";

export function importSet(setCode) {
    return (dispatch, getState) => {
        var state = getState();
        var url = state.apiURL + "/UpdateSet/" + setCode;
        dispatch(importLoading());
        //ensuite, on fait la requête
        fetch(url, {
            method: "POST",
            headers: { Authorization: authFromUser(state.user) }
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                    //TODO: avertir qu'il y a eu une erreur...
                }
                return response;
            })
            .then(response => response.json())
            .then(newSet => {
                //on nous retourne le nouvel emplacement, qu'on va appeller une action
                //pour aller mettre à jour aux endroits appropriés
                if (Object.keys(newSet).length !== 0) {
                    dispatch(importSuccess(newSet));
                } else {
                    dispatch(importError(true));
                }
            })
            .catch(err => {
                //TODO: avertir qu'il y a eu une erreur...
                dispatch(importError(err));
            });
    };
}

export function changeQuantity(setCode, newQuantity) {
    return (dispatch, getState) => {
        var state = getState();
        var url =
            state.apiURL + "/ChangeQuantity/" + setCode + "/" + newQuantity;
        dispatch(changeQuantityLoading());
        //ensuite, on fait la requête
        fetch(url, {
            method: "POST",
            headers: { Authorization: authFromUser(state.user) }
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                    //TODO: avertir qu'il y a eu une erreur...
                }
                return response;
            })
            .then(response => response.json())
            .then(sets_users => {
                //on nous retourne le nouvel emplacement, qu'on va appeller une action
                //pour aller mettre à jour aux endroits appropriés
                dispatch(changeQuantitySuccess(sets_users));
            })
            .catch(err => {
                //TODO: avertir qu'il y a eu une erreur...
                dispatch(changeQuantityError(err));
            });
    };
}

export function importSuccess(newSet) {
    return {
        type: "SET_IMPORT_SUCCESS",
        newSet
    };
}

export function importError(error) {
    return {
        type: "SET_IMPORT_ERROR",
        error
    };
}

export function importLoading() {
    return {
        type: "SET_IMPORT_LOADING"
    };
}

export function changeQuantitySuccess(sets_users) {
    return {
        type: "CHANGE_QUANTITY_SUCCESS",
        sets_users
    };
}

export function changeQuantityError(error) {
    return {
        type: "CHANGE_QUANTITY_ERROR",
        error
    };
}

export function changeQuantityLoading() {
    return {
        type: "CHANGE_QUANTITY_LOADING"
    };
}
