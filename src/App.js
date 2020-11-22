import logo from './logo.svg';
import './App.css';
 
import { msalInstance } from './msalInstance';
import Content from './Content';
import { useEffect, useState } from 'react';

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

  const dologin = () => {
      try {
        msalInstance.loginRedirect({});
      } catch (err) {
          console.log(err)
      }
  }
  console.log("setup") 
  
  return <><p>{loginState}</p>
    <button onClick={dologin}>login</button>
  </>
}

export default App;
