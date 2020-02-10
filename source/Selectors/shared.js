import { toPlural } from "/source/Shared/helpers";

//TODO: Cache this with 'Reselect'

export function getList(state, type) {
    if (state[type]) {
        return Object.keys(state[type].list).map(id => state[type].list[id]);
    }
}

export function getListError(state, type) {
    return state[type].error;
}

export function getListIsLoading(state, type) {
    return state[type].isLoading;
}

export function getElement(state, type, id) {
    var plural = toPlural(type);
    if (state[plural].list[id] === undefined) {
        return {};
    }
    return state[plural].list[id];
}

export function getElementIsLoading(state, type, id) {
    var plural = toPlural(type);
    if (state[plural].list[id] === undefined) {
        return false;
    }
    return state[plural].list[id].meta.isLoading;
}

export function getElementError(state, type, id) {
    var plural = toPlural(type);
    if (state[plural].list[id] === undefined) {
        return false;
    }
    return state[plural].list[id].meta.error;
}
