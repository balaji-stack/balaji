import React from "react";
import Image from "next/image";
import Link from "next/link";
import "react-perfect-scrollbar-z/build/styles.css";
import Scrollbar from "react-perfect-scrollbar-z";
  type Props = {
    items :any
  }
const MenuItem = (props: Props)=>{
  const items = props.items;
  const scrollbarProps = { maxHeight:"300px",className:"submenu_ul",tagName:"ul",effectData:{items},always: true}
  if (items.childrens) {
    return (
      <li>
        <Link href={items.path || "#"} className="main_nav_item_a">
          <i className="menu_icon">
            <Image src={items.icon} alt="icon" />
          </i>
          <span>{items.title}</span>
        </Link>
        <div className="submenu_block">
        <Scrollbar {...scrollbarProps}>     
            {items.childrens?.map((child: any, i: any) => (
              <MenuItem key={i} items={child} />
            ))} 
          </Scrollbar>
        </div>
          
      </li>
    );
  } else {
    return (
      <li>
        <Link href={items.path || "#"} className="main_nav_item_a">
          <i>
            <Image src={items.icon} alt="icon" />
          </i>
          <span>{items.title}</span>
        </Link>
      </li>
    );
  }
}
export default MenuItem;
