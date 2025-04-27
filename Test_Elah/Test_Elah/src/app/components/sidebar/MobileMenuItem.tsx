import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { AnyObject } from "yup";

type Props = {
  menu: any
}

const MobileMenuItem = (props: Props) => {
  let menu = props.menu;
  const [open, setOpen] = useState(false);
  return (
    <li className={open ? "sidebar-item open" : "sidebar-item"}>
      <Link href={menu.path} className="mobile_nav_a">
        <i className="menu_icon">
          <Image src={menu.icon} alt="Icon" />
        </i>
        <span className="menu_title">{menu.title}</span>
        {menu.childrens && <span className="mob_tog_i" onClick={() => setOpen(!open)}>
          <i className="fa-plus">
            <FontAwesomeIcon icon={faPlus} />
          </i>
          <i className="fa-minus">
            <FontAwesomeIcon icon={faMinus} />
          </i>
        </span>}
      </Link>
      <div className="submenu_child">
        <ul>
          {menu.childrens && menu.childrens.filter((subMenu: AnyObject) => subMenu.permission)?.map((subMenu: AnyObject, i: number) => {
            return (
              <MobileMenuItem menu={subMenu} key={i}/>
            )
          })}
        </ul>
      </div>
    </li>
  );
}
export default MobileMenuItem;