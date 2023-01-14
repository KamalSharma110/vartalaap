import { useContext} from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AuthForm from "./components/AuthForm";
import Layout from "./components/Layout";
import AuthContext from "./store/auth-store";

function App() {
  const authCtx = useContext(AuthContext);

  if(authCtx.isLoggedIn)
  document.getElementsByTagName('body')[0].style.background = 'linear-gradient(to bottom left,#170e5f, #433491, #56382e)';
  else
  document.getElementsByTagName('body')[0].style.background = '#dfdfef';
  
  return (
    <Switch>
      <Route path='/' exact>
        <Redirect to='/auth' />
      </Route>

      <Route path='/auth'>
        <AuthForm />
      </Route>

      {authCtx.isLoggedIn && <Route path='/home'>
        <Layout />
      </Route>}

      <Route path='*'>
        <AuthForm />
      </Route>
    </Switch>
  );
}

export default App;
