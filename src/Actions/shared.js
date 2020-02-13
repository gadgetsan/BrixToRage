import { authFromUser } from "Shared/helpers";

export function error(stateType, error, id) {
    return {
        type: "ERROR",
        stateType,
        error,
        id
    };
}
export function isLoading(stateType, bool, id) {
    return {
        type: "IS_LOADING",
        stateType,
        isLoading: bool,
        id
    };
}
export function fetchListSuccess(stateType, data) {
    return {
        type: "FETCH_LIST_SUCCESS",
        stateType,
        data
    };
}
export function fetchElementSuccess(stateType, data, id) {
    return {
        type: "FETCH_ELEMENT_SUCCESS",
        stateType,
        data,
        id
    };
}

export function fetchTemporaryList(stateType, page, search) {
    return (dispatch, getState) => {
        var state = getState();
        var url =
            state.apiURL +
            stateType +
            "/" +
            (page ? page + "/" : "") +
            (search ? search + "/" : "");
        //immediatement, on lance l'action qui dit que ça load
        dispatch(isLoading("temp", true));
        //ensuite, on fait la requête
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json())
            .then(parts => {
                dispatch(fetchListSuccess("temp", parts));
            })
            .then(parts => {
                dispatch(isLoading("temp", false));
            })
            .catch(err => {
                dispatch(error("temp", err));
            });
    };
}

export function fetchList(stateType, page, search) {
    return (dispatch, getState) => {
        var state = getState();
        var url =
            state.apiURL +
            stateType +
            "/" +
            (page ? page + "/" : "") +
            (search ? search + "/" : "");
        //immediatement, on lance l'action qui dit que ça load
        dispatch(isLoading(stateType, true));
        //ensuite, on fait la requête
        fetch(url, {
            headers: { Authorization: authFromUser(state.user) }
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json())
            .then(parts => {
                dispatch(fetchListSuccess(stateType, parts));
            })
            .then(parts => {
                dispatch(isLoading(stateType, false));
            })
            .catch(err => {
                dispatch(error(stateType, err));
            });
    };
}

export function fetchElement(elementType, id) {
    return (dispatch, getState) => {
        var state = getState();
        var url = state.apiURL + "/" + elementType + "/" + id;
        //immediatement, on lance l'action qui dit que ça load
        dispatch(isLoading(elementType, true, id));
        //ensuite, on fait la requête
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json())
            .then(parts => {
                dispatch(fetchElementSuccess(elementType, parts, id));
            })
            .then(parts => {
                dispatch(isLoading(elementType, false, id));
            })
            .catch(err => {
                dispatch(error(elementType, err, id));
            });
    };
}
