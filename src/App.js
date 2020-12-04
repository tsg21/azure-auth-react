import './App.css';
import jwt_decode from "jwt-decode";
 
import { msalInstance } from './msalInstance';
import { useEffect, useState } from 'react';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

const App = () =>  {
  const [idToken, setIdToken] = useState(null)
  const [loginState, setLoginState] = useState("waiting")
  const [accessToken, setAccessToken] = useState(null)
  const [account, setAccount] = useState(null)

  useEffect(() => {
    msalInstance.handleRedirectPromise().then((tokenResponse) => {
      if (tokenResponse) {
        console.log("tokenResponse", tokenResponse)
        setLoginState("loggedin")
        setIdToken(tokenResponse.idToken)
        setAccount(tokenResponse.account)
      } else {
        console.log("No tokenResponse")
        setLoginState("dologin")
      }
    }).catch((error) => {
      console.log("login err", error)
    })
  }, [])

  useEffect(() => {
    if (!account) {
      return
    }

    console.log(msalInstance.getAllAccounts())
    var request = {
        scopes: ["api://backend1/Read", "api://backend1/Write"],
        account: account
    };
    
    msalInstance.acquireTokenSilent(request).then(tokenResponse => {
        console.log("Access token: ", tokenResponse)
        setAccessToken(tokenResponse.accessToken)
    }).catch(error => {
        if (error instanceof InteractionRequiredAuthError) {
            // fallback to interaction when silent call fails
            return msalInstance.acquireTokenRedirect(request)
        } else {
          console.log(error)
        }
    });
  }, [account])

  const dologin = () => {
      try {
        var loginRequest = {
          scopes: ["api://backend1/Read", "api://backend1/Write"]
        };

        msalInstance.loginRedirect(loginRequest);
      } catch (err) {
          console.log(err)
      }
  }  
  return <><p>{loginState}</p>
    <button onClick={dologin}>login</button>
    <p>Id Token:</p>
    <pre>{idToken ? JSON.stringify(jwt_decode(idToken), null, 2) : null}</pre>
    <p>Access token:</p>
    <pre>{accessToken ? JSON.stringify(jwt_decode(accessToken), null, 2) : null}</pre>
    <p>Account</p>
    <pre>{account ? JSON.stringify(account, null, 2) : null}</pre>
  </>
}

export default App
