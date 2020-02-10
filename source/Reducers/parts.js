export function updateLocation(state, action) {
    switch (action.type) {
        case "PART_UPDATE_LOCATION":
            var newState = JSON.parse(JSON.stringify(state));

            //console.log(newState.parts.list[action.partId].Locations);
            console.log(action);
            var meta = newState.parts.list[action.partId].meta;
            newState.parts.list[action.partId] = action.partData;
            newState.parts.list[action.partId].meta = meta;
            //console.log(action.partData.Locations);
            return newState;
        default:
            return state;
    }
}
