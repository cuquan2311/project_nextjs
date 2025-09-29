"use client";
import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListSubheader,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Link from "next/link";

export interface DropdownMenuItem {
  text: string;
  icon: React.ReactNode;
  href?: string;
  children?: DropdownMenuItem[];
}

interface DropdownMenuProps {
  title: string;
  items: DropdownMenuItem[];
  open: boolean;
  pathname: string | null;
}

export default function DropdownMenu({
  title,
  items,
  open,
  pathname,
}: DropdownMenuProps) {
  const [expanded, setExpanded] = useState(true); // cha
  const [childOpen, setChildOpen] = useState<{ [key: string]: boolean }>({}); // con

  const toggleChild = (key: string) =>
    setChildOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
      {/* Title giống ListSubheader */}
      <ListSubheader
        disableSticky
        onClick={() => setExpanded(!expanded)}
        sx={{
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.1em",
          color: "text.secondary",
          lineHeight: "32px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: open ? 2 : 0,
        }}
      >
        {title}
        {expanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
      </ListSubheader>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List disablePadding>
          {items.map((item) => (
            <React.Fragment key={item.text}>
              {item.children ? (
                <>
                  <ListItemButton
                    onClick={() => toggleChild(item.text)}
                    sx={{ pl: 4, justifyContent: "space-between" }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
                    {open && <ListItemText primary={item.text} />}
                    {open &&
                      (childOpen[item.text] ? (
                        <ExpandLess fontSize="small" />
                      ) : (
                        <ExpandMore fontSize="small" />
                      ))}
                  </ListItemButton>

                  <Collapse in={childOpen[item.text]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <Link
                          key={child.text}
                          href={child.href ?? "#"}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <ListItemButton
                            sx={{
                              pl: 6,
                              bgcolor: pathname === child.href ? "action.selected" : "",
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 32 }}>{child.icon}</ListItemIcon>
                            {open && <ListItemText primary={child.text} />}
                          </ListItemButton>
                        </Link>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <Link
                  href={item.href ?? "#"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemButton
                    sx={{
                      pl: 4,
                      bgcolor: pathname === item.href ? "action.selected" : "",
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
                    {open && <ListItemText primary={item.text} />}
                  </ListItemButton>
                </Link>
              )}
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </>
  );
}
