export function importSet(state, action) {
    if (state.importSet === undefined) {
        var newState = { ...state };
        newState.importSet = {
            set: {},
            error: false,
            loading: false
        };
        return newState;
    }
    switch (action.type) {
        case "SET_IMPORT_SUCCESS":
            var newState = JSON.parse(JSON.stringify(state));
            newState.importSet.set = action.newSet;
            newState.importSet.loading = false;
            return newState;
        case "SET_IMPORT_LOADING":
            var newState = JSON.parse(JSON.stringify(state));
            newState.importSet.loading = true;
            return newState;
        case "SET_IMPORT_ERROR":
            var newState = JSON.parse(JSON.stringify(state));
            newState.importSet.error = true;
            newState.importSet.loading = false;
            return newState;
        default:
            return state;
    }
}
