import { Fragment } from "react";
import { Outlet } from "react-router";
import { Header } from "@/layout/header";

const Main = () => {
  return (
    <Fragment>
      <div className="wrapper flex grow flex-col">
        <Header />
        <main className="grow content pt-5" role="content">
          <Outlet />
        </main>
      </div>
    </Fragment>
  );
};

export { Main };
