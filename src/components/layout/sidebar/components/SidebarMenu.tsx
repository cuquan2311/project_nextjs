"use client";
import React from "react";
import { List, Box } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import GroupIcon from "@mui/icons-material/Group";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StyleIcon from "@mui/icons-material/Style";
import { usePathname } from "next/navigation";
import DropdownMenu, { DropdownMenuItem } from "./sidebarMenu/DropdownMenu";
import SidebarMenuItem from "./sidebarMenu/SidebarMenuItem";
import {
  AccountBalance,
  AutoGraph,
  CardTravel,
  ContactMail,
  Laptop,
  Message,
} from "@mui/icons-material";
import LanguageSwitcher from "@/components/language/LanguageButton";
import { SimpleThemeToggle } from "@/components/theme/ThemeToggle";
import HeaderUser from "../../headerAdmin/HeaderUser";


export default function SidebarMenu({ open }: { open: boolean }) {
  const pathname = usePathname();

  const overviewMenu: DropdownMenuItem[] = [
    { text: "App", icon: <Laptop />, href: "/admin" },
    { text: "E-commerce", icon: <CardTravel />, href: "/admin/Ecommerce" },
    { text: "Analytics", icon: <AutoGraph />, href: "/admin/Analytics" },
    { text: "Banking", icon: <AccountBalance />, href: "/admin/banking" },
  ];

  const managementMenu: DropdownMenuItem[] = [
    { text: "Products", icon: <Inventory2Icon />, href: "/admin/products" },
    {
      text: "Users",
      icon: <GroupIcon />,
      children: [
        { text: "List", icon: <FormatListBulletedIcon />, href: "/admin/users" },
        { text: "Card", icon: <StyleIcon />, href: "/admin/users/usersCard" },
      ],
    },
    { text: "Mail", icon: <ContactMail />, href: "/admin/mail" },
    { text: "Thảo luận", icon: <Message />, href: "/admin/discuss" },
  ];

  if (open) {
    return (
      <List sx={{ flexGrow: 1, px: 1 }}>
        <DropdownMenu
          title="OVERVIEW"
          items={overviewMenu}
          open={open}
          pathname={pathname}
        />
        <DropdownMenu
          title="MANAGEMENT"
          items={managementMenu}
          open={open}
          pathname={pathname}
        />
      </List>
    );
  } else {
    const collapsedItems: DropdownMenuItem[] = [
      ...overviewMenu,
      ...managementMenu.flatMap((item) =>
        item.children ? item.children : [item]
      ),
    ];

    return (
      <List sx={{ flexGrow: 1, px: 1 }}>
        {collapsedItems.map((item) => (
          <SidebarMenuItem
            key={item.text}
            text={item.text}
            icon={item.icon}
            href={item.href ?? "#"}
            open={open}
            isActive={pathname === item.href}
          />
        ))}
      </List>
    );
  }
}
