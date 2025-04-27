import Link from 'next/link';
import Image from 'next/image'
import React from 'react'
import { AnyObject } from 'yup';

type Props = {
    menu: any
}

const DesktopMenuItem = (props: Props) => {
    let menu = props.menu;
    return (
        <li>
            <Link className="main_nav_item_a" href={menu.path}>
                <i className="menu_icon"><Image src={menu.icon} alt="icon" /></i>
                <span>{menu.title}</span>
            </Link>
            {menu.childrens && <div className="submenu_block">
                <div className="submenu_inner_block">
                    <ul style={{ height: '250px', overflow: 'hidden', overflowY: 'auto', whiteSpace: 'nowrap' }}>
                        {menu.childrens && menu.childrens.filter((subMenu: AnyObject) => subMenu.permission)?.map((subMenu: AnyObject, j: number) => {
                            return (<DesktopMenuItem menu={subMenu} />)
                        })}
                    </ul>
                </div>
            </div>}
        </li>
    )
}

export default DesktopMenuItem