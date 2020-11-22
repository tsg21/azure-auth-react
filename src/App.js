import logo from './logo.svg';
import './App.css';
 
import { msalInstance } from './msalInstance';
import Content from './Content';
import { useEffect, useState } from 'react';
import { InteractionRequiredAuthError, LogLevel } from '@azure/msal-browser';

const App = () =>  {
  const [tokenResponse, setTokenResponse] = useState(null)
  const [loginState, setLoginState] = useState("waiting")

  useEffect(() => {
    msalInstance.handleRedirectPromise().then((tokenResponse) => {
      if (tokenResponse) {
        console.log("tokenResponse", tokenResponse)
        setLoginState("loggedin")
        setTokenResponse(tokenResponse)
      } else {
        console.log("No tokenResponse")
        setLoginState("dologin")
      }
    }).catch((error) => {
      console.log("login err", error)
    })
  }, [])

  useEffect(() => {
    if (loginState !== "loggedin") {
      return
    }

    var request = {
        scopes: ["api://backend1/Read", "api://backend1/Write"],
        account: msalInstance.getAllAccounts()[0],
    };
    
    msalInstance.acquireTokenSilent(request).then(tokenResponse => {
        console.log("Access token: ", tokenResponse)
    }).catch(error => {
        if (error instanceof InteractionRequiredAuthError) {
            // fallback to interaction when silent call fails
            return msalInstance.acquireTokenRedirect(request)
        } else {
          console.log(error)
        }
    });
  }, [loginState])

  const dologin = () => {
      try {
        var loginRequest = {
          scopes: ["user.read", "api://backend1/Read", "api://backend1/Write"]
        };

        msalInstance.loginRedirect(loginRequest);
      } catch (err) {
          console.log(err)
      }
  }  
  return <><p>{loginState}</p>
    <button onClick={dologin}>login</button>
  </>
}

export default App;
