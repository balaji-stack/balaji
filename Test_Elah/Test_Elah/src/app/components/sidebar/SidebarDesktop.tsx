"use client";
import React from "react";
import getMenus from "../../../helpers/sidebarMenus";
import Image from "next/image";
import Link from "next/link";
import { AnyObject } from "yup";
import { useSelector } from "react-redux";
const SidebarDesktop = () => {
  const menuObj = useSelector((state: any) => state.auth.menuObj);
  const SidebarMenus = getMenus(menuObj);
  
  return (
    <div className="sidebar_inner">
      <ul className="sidebar_ul">
      {SidebarMenus.filter((menu: AnyObject) => menu.permission)?.map((menu: AnyObject) => {
        return (
          
            <li key={menu.id}>
              <Link className="main_nav_item_a" href={menu.path}>
                <i className="menu_icon"><Image src={menu.icon} alt="icon" /></i>
                <span>{menu.title}</span>
              </Link>

              <div className="submenu_block">
                <div className="submenu_inner_block">
                  <ul style={{ height: '250px', overflow: 'hidden', overflowY: 'auto', whiteSpace: 'nowrap' }}>
                    {menu.childrens?.filter((subMenu: AnyObject) => subMenu.permission)?.map((subMenu: AnyObject) => {
                      return (
                        <li key={subMenu.id}>
                          <Link className="main_nav_item_a" href={subMenu.path}>
                            <i className="menu_icon"><Image src={subMenu.icon} alt="icon" /></i>
                            <span>{subMenu.title}</span>
                          </Link>
                            {subMenu?.childrens &&
                              <ul>
                                {subMenu?.childrens.filter((subMenu2: AnyObject) => subMenu2.permission)?.map((subMenu2: AnyObject) => {
                                  return (
                                    <li key={subMenu2.id}>
                                      <Link className="main_nav_item_a" href={subMenu2.path}>
                                        <i className="menu_icon"><Image src={subMenu2.icon}  alt="icon" /></i>
                                        <span>{subMenu2.title}</span>
                                      </Link>
                                  </li>
                                  )
                                })}
                              </ul>}
                        </li>)
                    })}
                  </ul>
                </div>
              </div>
            </li>
          )
      })}
      </ul>
      {/*UrlEsternoMenus &&
        <ul>
          {UrlEsternoMenus.filter((menu: AnyObject) => menu.permission)?.map((menu: AnyObject, i: number) => <li>{menu.title}</li>)}
        </ul>
      */}
    </div>
  );
};

export default SidebarDesktop;
                                    