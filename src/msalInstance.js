import * as msal from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: '7760fcac-c585-42bd-9e52-616cec796589',
        authority: 'https://login.microsoftonline.com/c145a4fe-8f5a-44fe-b8ac-7aa36c863a87'
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: true
    }
};


export const msalInstance = new msal.PublicClientApplication(msalConfig);
