import { Fragment } from "react";
import { Outlet } from "react-router";
import { Header } from "@/layout/header";
import Footer from "../footer/footer";

const Main = () => {
  
  return (
    <Fragment>
      <div className="wrapper flex grow flex-col font-montserrat">
        <Header />
        <main className="grow content" role="content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </Fragment>
  );
};

export { Main };
