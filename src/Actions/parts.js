export function changeLocation(partId, locationId) {
    return (dispatch, getState) => {
        var state = getState();
        var url =
            state.apiURL + "/Part/" + partId + "/ChangeLocation/" + locationId;
        //ensuite, on fait la requête
        fetch(url, { method: "POST" })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                    //TODO: avertir qu'il y a eu une erreur...
                }
                return response;
            })
            .then(response => response.json())
            .then(partData => {
                //on nous retourne le nouvel emplacement, qu'on va appeller une action
                //pour aller mettre à jour aux endroits appropriés
                dispatch(updateLocation(partId, partData));
            })
            .catch(err => {
                //TODO: avertir qu'il y a eu une erreur...
                //dispatch(error(elementType, err, id));
            });
    };
}

export function updateLocation(partId, partData) {
    return {
        type: "PART_UPDATE_LOCATION",
        partId,
        partData
    };
}
