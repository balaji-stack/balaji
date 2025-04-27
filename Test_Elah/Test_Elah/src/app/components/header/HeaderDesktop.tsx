"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../img/logo.png";
import User from "../../../img/user.png";
import Link from "next/link";
import SERVER_URL from "@/helpers/common";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import FullPageLoader from "../shared/FullPageLoader";
import { popupMsg } from "@/helpers/messages";
import { useDispatch, useSelector } from "react-redux";
import { updateLoginInfo, updateMenuObj} from "@/redux/slices/auth-slice";
import {  updateUrlObject } from "@/redux/slices/action-slice";

const HeaderDesktop = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const sidebarTogClick = () => {
    const pageBody = document.querySelector("body");
    pageBody?.classList.toggle("sidebar_toggle");
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginInfo = useSelector((state: any) => state.auth.loginInfo);
  const userName = loginInfo?.userName;
  const handleLogout = () => {
    setIsLoading(true);
    const URL = `${SERVER_URL}/user/logout`;
    axios.post(URL, { userId: loginInfo?.userid }, {
      withCredentials: true
    }).then(() => {
      popupMsg("disconnesso", "info");
    }).catch((e: AxiosError) => {
      let status = e.status;
      if (status === 401) {
        popupMsg("L'utente non autorizzato o la sessione è scaduta.", "error");
        router.push('/login');
      } else {
        popupMsg("qualcosa è andato storto", "error");
      }
    }).finally(() => {
      setIsLoading(false);
      dispatch(updateMenuObj(null));
      dispatch(updateLoginInfo(null));
      dispatch(updateUrlObject(null));
      router.push('/login');
    });
  }

  /////////////////////////current time///////////////////
  const [time, setTime] = useState(new Date());
  const italianTime = time.toLocaleString('it-IT', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'Europe/Rome'
  });
  useEffect(() => {
    /////////////////userdetails//////////////////
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);



    return () => {
      clearInterval(intervalId);
    };
  }, []);

  /////////////////////////current time///////////////////

  const formatter = new Intl.DateTimeFormat('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return (
    <>
      {isLoading ? <FullPageLoader /> :
        <header className="header_wrapper desktop_header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                <button
                  type="button"
                  className="sidebar_tog"
                  onClick={sidebarTogClick}
                >
                  <span className="tog_shape1"></span>
                  <span className="tog_shape2"></span>
                  <span className="tog_shape3"></span>
                </button>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                <div className="logo_nav_block">
                  <Link href="/dashboard" className="logo_a">
                    <Image src={Logo} alt="Logo" priority={true} />
                  </Link>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                <div className="header_nav_block">
                  <h5 style={{ marginRight: "30px", fontWeight: "normal" }}>
                    Welcome <span style={{ color: "#0069ba", fontWeight: 600 }}>{userName}</span>
                  </h5>

                  <div className="date_time_block">
                    <span>{italianTime}</span>
                    <span>

                      {formatter.format(new Date())}
                    </span>
                  </div>
                  <div className="header_links">
                    <ul>
                      <li>
                        <Dropdown drop="down-centered">
                          <Dropdown.Toggle id="dropdown-user">
                            <Image src={User} alt="user" priority={true} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#" onClick={handleLogout}>
                              <FontAwesomeIcon icon={faPowerOff} />
                              Logout
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      }
    </>
  );
};

export default HeaderDesktop;
