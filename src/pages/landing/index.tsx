import React from "react";
import { Page } from "../../prebuilt/components/Page";
import { Hero } from "./partials/Hero";
import { Plan } from "./partials/Plan";
import { TechnologyList } from "./partials/TechnologyList";

export const LandingPage: React.FC = () => (
  <Page title="Интенсив по современной Frontend разработке - Solvery.io">
    <Hero />
    <Plan />
    <TechnologyList />
  </Page>
);
