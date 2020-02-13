import React, { Component } from "react";

export function listReduce(list, meta = true) {
    return list.reduce(function(map, obj) {
        map[obj.id] = obj;
        if (meta) {
            map[obj.id]["meta"] = {};
        }
        return map;
    }, {});
}

export function mapIfLoaded(
    array,
    displayFunction,
    alternativeText = "Loading..."
) {
    if (array === undefined) {
        return <span>{alternativeText}</span>;
    } else {
        return array.map(displayFunction);
    }
}

export function toPlural(text) {
    return text + "s";
}

export function getContrastYIQ(hexcolor) {
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
}

export function authFromUser(user) {
    var authData = window.btoa(user.Email + ":" + user.password);
    return "Basic " + authData;
}
