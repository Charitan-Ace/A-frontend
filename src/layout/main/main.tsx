import { Fragment } from "react";
import { Outlet } from "react-router";
import { Navbar } from "@/layout/navbar";

const Main = () => {
  return (
    <Fragment>
      <div className="wrapper flex grow flex-col">
        <Navbar />
        <main className="grow content pt-5" role="content">
          <Outlet />
        </main>
      </div>
    </Fragment>
  );
};

export { Main };
