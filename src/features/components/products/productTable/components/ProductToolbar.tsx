"use client";
import { useState } from "react";
import { Box, Button, InputBase, Toolbar, Typography, IconButton } from "@mui/material";
import { AddCircle, Search } from "@mui/icons-material";


export default function ProductToolbar({
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
    <Toolbar className="product-toolbar">
      <Typography variant="h5" className="product-toolbar__title" sx={{ fontWeight: "700" }}>
        {title}
      </Typography>

      <Box className="product-toolbar__actions">
        <Box
          className={`product-toolbar__search-container ${showSearch
            ? "product-toolbar__search-container--open"
            : "product-toolbar__search-container--closed"
            }`}
        >
          <IconButton onClick={() => setShowSearch((prev) => !prev)}>
            <Search />
          </IconButton>
          <InputBase
            placeholder="Search..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`product-toolbar__search-input ${showSearch
              ? "product-toolbar__search-input--open"
              : "product-toolbar__search-input--closed"
              }`}
          />
        </Box>

        <Button
          variant="contained"
          startIcon={<AddCircle />}
          onClick={onAdd}
          className="product-toolbar__add-button"
        >
          Add Product
        </Button>
      </Box>
    </Toolbar>
  );
}