import { useContext} from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AuthForm from "./components/AuthForm";
import Layout from "./components/Layout";
import AuthContext from "./store/auth-store";

function App() {
  const authCtx = useContext(AuthContext);

  
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
