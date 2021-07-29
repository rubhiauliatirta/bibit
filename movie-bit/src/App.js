import NavigationBar from "./components/NavigationBar";
import { Route, Switch } from "react-router-dom"
import { Home, Detail, PageNotFound } from "./pages"

function App() {
  return (
    <>
      <NavigationBar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/movie/:id">
          <Detail />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
