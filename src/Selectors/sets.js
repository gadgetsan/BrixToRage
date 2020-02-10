import { createSelector } from "reselect";

const partsSelector = state => state.sets.list;

export function getSets(state) {
    return Object.keys(state.sets.list).map(id => state.sets.list[id]);
}

export function getSet(state, id) {
    return state.sets.list[id];
}
