import React, { useState } from "react";
import Image from "next/image";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../img/logo.png";
import MobMenu from "../../../img/menu-mob.png";
import Link from "next/link";
import SERVER_URL from "@/helpers/common";
import axios, { AxiosError } from "axios";
import { popupMsg } from "@/helpers/messages";
import FullPageLoader from "../shared/FullPageLoader";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { updateLoginInfo, updateMenuObj} from "@/redux/slices/auth-slice";
import {  updateUrlObject } from "@/redux/slices/action-slice";
const HeaderMobile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const mobSidebarToggle = () => {
    const pageBody = document.querySelector("body");
    pageBody?.classList.toggle("sidebarmob_toggle");
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginInfo = useSelector((state: any) => state.auth.loginInfo);
  const handleLogout = async () => {
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
  return (
    <>
      {isLoading ? <FullPageLoader /> :
        <header className="mobile_header_wrapper">
          <div className="container-fluid">
            <div className="mob_nav">
              <div className="row">
                <div className="col-md-4 col-sm-4 col-4">
                  <button
                    type="button"
                    className="mob_tog"
                    onClick={mobSidebarToggle}
                  >
                    <span className="tog_shape1"></span>
                    <span className="tog_shape2"></span>
                    <span className="tog_shape3"></span>
                  </button>
                </div>
                <div className="col-md-4 col-sm-4 col-4">
                  <Link href="/dashboard" className="logo_a">
                    <Image src={Logo} alt="Logo" priority={true} />
                  </Link>
                </div>
                <div className="col-md-4 col-sm-4 col-4">
                  <ul className="nav_menus_mob">
                    <li>
                      <Dropdown drop="down-centered">
                        <Dropdown.Toggle
                          id="dropdown-user"
                          className="btn btn-primary dropdown-toggle user_tog"
                        >
                          <Image src={MobMenu} alt="user" priority={true} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item as={"button"} onClick={handleLogout}>
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
        </header>
      }
    </>
  );
};

export default HeaderMobile;
