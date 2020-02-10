import { listReduce } from "/src/Shared/helpers";

export default class FetchReducer {
    constructor(singleType, listType) {
        this.single = singleType;
        this.list = listType;
        this.reduce = this.reduce.bind(this);
        for (const [key, currentReducer] of Object.entries(this.reducers)) {
            this.reducers[key] = currentReducer.bind(this);
        }
    }

    reduce(state, action) {
        var previousState = { ...state };
        for (const [key, currentReducer] of Object.entries(this.reducers)) {
            previousState = currentReducer(previousState, action);
        }
        return previousState;
    }

    reducers = {
        Init: function(state, action) {
            if (state[this.list] === undefined) {
                var toReturn = { ...state };
                toReturn[this.list] = {
                    list: {},
                    error: false,
                    isLoading: true
                };
                return toReturn;
            } else {
                return state;
            }
        },
        HasErrored: function(state = false, action) {
            if (action.stateType === this.list) {
                switch (action.type) {
                    case "ERROR":
                        var newState = { ...state };
                        newState[this.list]["error"] = action.error;
                        return newState;
                    default:
                        return state;
                }
            } else if (action.stateType === this.single) {
                switch (action.type) {
                    case "ERROR":
                        var newState = { ...state };
                        var listItem = newState[this.list]["list"][action.id];
                        if (listItem === undefined) {
                            listItem = {
                                meta: {}
                            };
                        }
                        listItem["meta"]["error"] = action.error;
                        newState[this.list]["list"][action.id] = listItem;
                        return newState;
                    default:
                        return state;
                }
            } else {
                return state;
            }
        },
        IsLoading: function(state = false, action) {
            if (action.stateType === this.list) {
                switch (action.type) {
                    case "IS_LOADING":
                        var newState = { ...state };
                        newState[this.list]["isLoading"] = action.isLoading;
                        return newState;
                    default:
                        return state;
                }
            } else if (action.stateType === this.single) {
                switch (action.type) {
                    case "IS_LOADING":
                        var newState = { ...state };
                        var listItem = newState[this.list]["list"][action.id];
                        if (listItem === undefined) {
                            listItem = {
                                meta: {}
                            };
                        }
                        listItem["meta"]["isLoading"] = action.isLoading;
                        newState[this.list]["list"][action.id] = listItem;
                        return newState;
                    default:
                        return state;
                }
            } else {
                return state;
            }
        },
        loadedlMulti: function(state = [], action) {
            if (action.stateType === this.list) {
                switch (action.type) {
                    case "FETCH_LIST_SUCCESS":
                        var newState = { ...state };
                        newState[this.list]["list"] = listReduce(action.data);
                        return newState;
                    default:
                        return state;
                }
            } else {
                return state;
            }
        },

        loadedSingle: function(state = [], action) {
            if (action.stateType === this.single) {
                switch (action.type) {
                    case "FETCH_ELEMENT_SUCCESS":
                        var newState = { ...state };
                        //on doit garder les meta-données, même après avoir été cherché
                        var metaData =
                            newState[this.list]["list"][action.id]["meta"];
                        newState[this.list]["list"][action.id] = action.data;
                        newState[this.list]["list"][action.id][
                            "meta"
                        ] = metaData;
                        return newState;
                    default:
                        return state;
                }
            } else {
                return state;
            }
        }
    };
}
