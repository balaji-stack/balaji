"use client"
import React, { useEffect }  from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Providers from "@/redux/Provider";
import axios from "axios";
import SERVER_URL from "@/helpers/common";
import { popupMsg } from "@/helpers/messages";
import { useRouter } from "next/navigation";


interface ChildrenType {
  children?: any;
}
const layout = ({ children }: ChildrenType) => {
  const router = useRouter();
  useEffect(() => {
    axios.get(`${SERVER_URL}/user/check-session`, {
      withCredentials: true,
    }).then((res) => {
      if(res.data != "1") {//1 for valid and 0 for invalid
          popupMsg("Sessione scaduta! Effettua il login per continuare","info");
            router.push('/login');
      }
    }).catch((err) => {
       popupMsg("qualcosa è andato storto", "error"); 
       router.push('/login');
    });
  }, []);
  return (
      <Providers>
        <Header />
        <Sidebar />
        <main className="content_main_wrapper">
          <div className="content_inner">
            {children}
          </div>
        </main>
      </Providers>
  );
};

export default layout;