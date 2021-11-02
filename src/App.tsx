import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LandingPage } from "./pages/landing";
import { MentorsPage } from "./pages/mentors";
import { ROUTES } from "./prebuilt/navigation/routes";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Api } from "./app/Api"

export type AppProps = {};

export const App: React.FC<AppProps> = () => {
  // useEffect(() => {
  //   const api = new Api("https://dev.solvery.io/api/v1")

  //   api.POST< {mentors: [], totalMentorsCount: number }>("mentor/getFiltered")
  //   .then((response) => {

  //   })
  // })
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path={ROUTES.homepage.url}>
            <LandingPage />
          </Route>
          <Route exact path={ROUTES.mentors.url}>
            <MentorsPage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};