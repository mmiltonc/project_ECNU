"use client";

import Header from "@/components/shared/header";
import Introduction from "@/partials/introduction";
import Programs from "@/partials/programs";
import Changes from "@/partials/changes";
import About from "@/partials/about";
import Motivation from "@/partials/motivation";
import Faq from "@/partials/faq";
import Contact from "@/partials/contact";
import Home from "@/partials/home";
import TopBar from "@/components/topBar";

export default function Landing() {
  return (
    <>
      <TopBar />
      <Home />
      <Introduction />
      <Programs />
      <Changes />
      <About />
      <Motivation />
      <Faq />
      <Contact />
    </>
  );
}
