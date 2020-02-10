import { combineReducers } from "redux";
import FetchReducer from "./FetchReducer";

import { apiURL } from "./shared";
import { updateLocation } from "./parts";
import { importSet } from "./sets";

export default function(oldState, action) {
    var fetchers = [
        new FetchReducer("part", "parts"),
        new FetchReducer("set", "sets"),
        new FetchReducer("location", "locations"),
        new FetchReducer("temp", "temp")
    ];
    var reducersList = [apiURL, updateLocation, importSet];
    //on ajoute les 'fetchers' à la liste
    fetchers.forEach(fetch => {
        reducersList.push(fetch.reduce);
    });
    var currentState = { ...oldState };
    return reduceList(currentState, action, reducersList);
}

var reduceList = function(state, action, list) {
    var previousState = state;
    for (var i = 0; i < list.length; i++) {
        var currentReducer = list[i];
        previousState = currentReducer(previousState, action);
    }
    return previousState;
};
