import * as msal from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: '7760fcac-c585-42bd-9e52-616cec796589'
    }
};


export const msalInstance = new msal.PublicClientApplication(msalConfig);
