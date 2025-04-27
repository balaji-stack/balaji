"use client"
import Card from "@/app/components/shared/Card";
import Title from "@/app/components/shared/Title";
import Link from "next/link";
import React from "react";
import getMenus from "@/helpers/sidebarMenus";
import { useSelector } from "react-redux";
const Page = () => {
  const menuObj = useSelector((state: any) => state.auth.menuObj);
  const SidebarMenus = getMenus(menuObj);
  const webOrderMenus: any = SidebarMenus.find((mainMenu: any) => mainMenu.title == "Web Order")?.childrens
    .filter((menu: any) => menu.permission);
  const reportMenus: any = SidebarMenus.find((mainMenu: any) => mainMenu.title == "Reports")?.childrens
    .filter((menu: any) => menu.permission);
  return (
    <div className="dashboard_pg_wrap">
      <div className="row">
        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <Card>
            <Title heading="Ordini web" />
            <div className="content_block">
              <div className="quick-links">
                <ul>
                  {webOrderMenus?.map((menu: any, i: number) => {
                    let keyIndex = i;
                    return(
                      <li key={keyIndex}>
                        <Link href={menu.path}>{menu.title}</Link>
                      </li>
                    )
                  }
                  )}
                </ul>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <Card>
            <Title heading="Reports" />
            <div className="content_block">
              <div className="quick-links">
                <ul>
                  {reportMenus?.map((menu: any, i: number) =>{
                    let keyIndex = i;
                    return(
                    <li key={keyIndex}>
                      <Link href={menu.path}>{menu.title}</Link>
                    </li>
                  )
                  })}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
