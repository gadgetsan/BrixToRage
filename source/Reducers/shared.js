export function apiURL(state, action) {
    if (state.apiURL === undefined) {
        var apiURL = "https://multibackend.herokuapp.com/lego/";
        if (document.domain === "pj2yjq46qx.csb.app") {
            apiURL = "https://21sle.sse.codesandbox.io/lego/";
            /*
          console.log(
              "using development environment, trying to connect to CodeSandbox"
          );*/
        }
        return { ...state, apiURL };
    } else {
        return state;
    }
}
