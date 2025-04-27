"use client";
import getMenus from "../../../helpers/sidebarMenus";
import { useSelector } from "react-redux";
import { AnyObject } from "yup";
import MobileMenuItem from "./MobileMenuItem";
const SidebarMobile = () => {
  const menuObj = useSelector((state: any) => state.auth.menuObj);
  const SidebarMenus = getMenus(menuObj);
  return (
    <div className="sidebar_mob_inner">
      <ul className="sidebar_ul_mob">
        {SidebarMenus.filter((menu: AnyObject) => menu.permission)?.map((menu: AnyObject, i: number) => {
          return (
            <MobileMenuItem menu={menu} key={i}/>
          )
          })}
      </ul>
    </div>
  );
};

export default SidebarMobile;
