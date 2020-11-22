import { MsalAuthProvider, LoginType } from 'react-aad-msal';
 
// Msal Configurations
const config = {
  auth: {
    authority: 'https://login.microsoftonline.com/common',
    clientId: '7760fcac-c585-42bd-9e52-616cec796589',
    redirectUri: 'http://localhost:3000'
  },
  cache: {
    cacheLocation: "localStorage"
    //storeAuthStateInCookie: true
  }
};
 
// Authentication Parameters
const authenticationParameters = {
  scopes: [
    'user.read',
    'api://backend1/Read'
  ]
}
 
// Options
const options = {
  loginType: LoginType.Popup,
  tokenRefreshUri: window.location.origin + '/auth.html'
}

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)