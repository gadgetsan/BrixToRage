import { createSelector } from "reselect";

const partsSelector = state => state.parts.list;

export function getParts(state) {
    return Object.keys(state.parts.list).map(id => state.parts.list[id]);
}

export function getPart(state, id) {
    return state.parts.list[id];
}
/*
export const getParts = createSelector(
    partsSelector,
    partsById => {
        return Object.keys(partsById).map(id => partsById[id]);
    }
);
*/
