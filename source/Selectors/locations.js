import { createSelector } from "reselect";

export function getLocations(state) {
    if (state.locations) {
        return Object.keys(state.locations.list).map(
            id => state.locations.list[id]
        );
    }
}

export function getLocation(state, id) {
    return state.locations.list[id];
}
/*
export const getParts = createSelector(
    partsSelector,
    partsById => {
        return Object.keys(partsById).map(id => partsById[id]);
    }
);
*/
