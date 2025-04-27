import React from "react";
import SidebarMobile from "./SidebarMobile";
import SidebarDesktop from "./SidebarDesktop";

const Sidebar = () => {
  return (
    <>
      {/*  Mobile Sidebar  */}
      <section className="sidebar_mobile_nav">
        <SidebarMobile />
      </section>
      {/*  Desktop Sidebar  */}

      <section className="sidebar_wrapper">
        <SidebarDesktop />
      </section>
    </>
  );
};

export default Sidebar;
