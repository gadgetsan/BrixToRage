module.exports.authHeader = authData => {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && authData) {
        return { Authorization: "Basic " + authData };
    } else {
        return {};
    }
};

module.exports.fetchHelper = (location, callback) => {
    module.exports.fetchHelperWithData(location, {}, callback);
};

if (document.domain == "olz6839009.codesandbox.io") {
    module.exports.apiURL = "https://2pl3rqowrj.sse.codesandbox.io";
} else {
    module.exports.apiURL = "https://idk-do.appspot.com/";
}

module.exports.apiGet = (location, header, data, callback) => {
    fetch(module.exports.apiURL + "/lego/" + location + module.exports.jsonToQueryString(data), {
        headers: header
    }).then(res => {
        res.text()
            .then(text => {
                if (res.status === 401) {
                    // auto logout if 401 response returned from api
                    //this.logout();
                    window.location = "/#/login";
                } else {
                    callback(JSON.parse(text));
                }
            })
            .catch(err => {
                console.error("ERROR WHEN READING STREAM: " + err.message);
            });
    });
};

module.exports.apiPost = (location, header, data, callback) => {
    window
        .fetch(module.exports.apiURL + "/lego/" + location, {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        })
        .then(res => {
            res.text()
                .then(text => {
                    if (res.status === 401) {
                        // auto logout if 401 response returned from api
                        //this.logout();
                        window.location = "/#/login";
                    } else {
                        callback(JSON.parse(text));
                    }
                })
                .catch(err => {
                    console.error("ERROR WHEN READING STREAM: " + err.message);
                });
        })
        .catch(function(err) {
            console.error("ERR: " + err.message);
        });
};

module.exports.fetchHelperWithData = (location, data, callback) => {
    //console.dir(user);
    var authData = module.exports.getAuthData();
    var headers = { "Content-Type": "application/json", Authorization: "Basic " + authData };
    //var headers = { "Content-Type": "application/json" };
    module.exports.apiGet(location, headers, data, callback);
};

module.exports.getAuthData = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    //console.dir(user);
    var authData = window.btoa(user.email + ":" + user.password);
    return authData;
};

module.exports.postHelper = (location, data, callback) => {
    var authData = module.exports.getAuthData();
    var headers = { "Content-Type": "application/json", Authorization: "Basic " + authData };
    module.exports.apiPost(location, headers, data, callback);
};

module.exports.postHelperNoAuth = (location, data, callback) => {
    var headers = { "Content-Type": "application/json" };
    module.exports.apiPost(location, headers, data, callback);
};

module.exports.jsonToQueryString = function(json) {
    return (
        "?" +
        Object.keys(json)
            .map(function(key) {
                return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
            })
            .join("&")
    );
};

module.exports.overlayColor = function(color) {
    color = "#" + color;
    //if only first half of color is defined, repeat it
    if (color.length < 5) {
        color += color.slice(1);
    }
    var output = color.replace("#", "0x") > 0xffffff / 2 ? "#333" : "#fff";
    //console.log("input: " + color + " output: " + output);
    return output;
};
