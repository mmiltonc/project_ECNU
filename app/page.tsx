import Header from "@/components/shared/header";
import { ModalProvider } from "@/app/context/modalContext";
import Introduction from "@/components/introduction";
import Programs from "@/components/programs";
import Products from "@/components/products";
import Changes from "@/components/changes";
import About from "@/components/about";
import Motivation from "@/components/motivation";
import Faq from "@/components/faq";
import Contact from "@/components/contact";
import Home from "@/components/home";
import TopBar from "@/components/topBar";

export default function Layout() {
  return (
    <ModalProvider>
      <TopBar />
      <Home />
      {/* <Header /> */}
      <Introduction />
      <Programs />
      <Products />
      <Changes />
      <About />
      <Motivation />
      <Faq />
      <Contact />
    </ModalProvider>
  );
}
