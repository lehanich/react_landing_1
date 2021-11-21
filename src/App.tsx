import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LandingPage } from "./pages/landing";
import { MentorsPage } from "./pages/mentors";
import { MentorPage } from "./pages/mentor";
import { ROUTES } from "./prebuilt/navigation/routes";
import { Provider } from "react-redux";
import { store } from "./app/store";

export type AppProps = {};

export const App: React.FC<AppProps> = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route
            exact
            path={ROUTES.homepage.url}>
            <LandingPage />
          </Route>
          <Route
            exact
            path={ROUTES.mentors.url}>
            <MentorsPage />
          </Route>
          <Route
            exact
            path="/mentors/:mentorId"
            render={ ( props )  => <MentorPage { ...props } /> }>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};
