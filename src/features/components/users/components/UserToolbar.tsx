"use client";

import { useState } from "react";
import { Box, Button, InputBase, Toolbar, Typography, IconButton } from "@mui/material";
import { AddCircle, Search } from "@mui/icons-material";

export default function UserToolbar({
  title,
  searchText,
  onSearchChange,
  onAdd,
}: {
  title: string;
  searchText: string;
  onSearchChange: (val: string) => void;
  onAdd: () => void;
}) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <Toolbar className="user-toolbar">
      <Typography variant="h5" sx={{ fontWeight: "700" }}>
        {title}
      </Typography>

      <Box className="user-toolbar__actions">
        <Box
          className={`user-toolbar__search-container ${showSearch
            ? "user-toolbar__search-container--open"
            : "user-toolbar__search-container--closed"
            }`}
        >
          <IconButton onClick={() => setShowSearch((prev) => !prev)}>
            <Search />
          </IconButton>
          <InputBase
            placeholder="Search..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`user-toolbar__search-input ${showSearch
              ? "user-toolbar__search-input--open"
              : "user-toolbar__search-input--closed"
              }`}
          />
        </Box>


        <Button
          variant="contained"
          startIcon={<AddCircle />}
          onClick={onAdd}
        >
          Add User
        </Button>
      </Box>
    </Toolbar>
  );
}
