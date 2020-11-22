import logo from './logo.svg';
import './App.css';
import { AzureAD, AuthenticationState } from 'react-aad-msal';
 

import { authProvider } from './authProvider';
import Content from './Content';

function App() {
  return (
    <>
  <AzureAD provider={authProvider} forceLogin={false}>{
  ({login, logout, authenticationState, error, accountInfo}) => {
      switch (authenticationState) {
        case AuthenticationState.Authenticated:
          return (
            <>
            <p>
              <span>Welcome, {accountInfo.account.name}!</span>
              <button onClick={logout}>Logout</button>
              
            </p>
            <Content />
            </>
          );
        case AuthenticationState.Unauthenticated:
          return (
            <div>
              {error && <p><span>An error occured during authentication, please try again!</span></p>}
              <p>
                <span>Hey stranger, you look new!</span>
                <button onClick={login}>Login</button>
              </p>
            </div>
          );
        case AuthenticationState.InProgress:
          return (<p>Authenticating... <button onClick={login}>Login</button></p>);
      }
    }}
    </AzureAD>
    </>
    

  
  );
}

export default App;
