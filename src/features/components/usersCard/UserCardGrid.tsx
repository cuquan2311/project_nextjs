"use client";

import { Grid, Box, Typography, Container, Toolbar, IconButton, InputBase, Button } from "@mui/material";
import UserCard from "./UserCard";
import { CardUserType } from "@/types/cardUserType";
import { AddCircle, Search } from "@mui/icons-material";
import { useState } from "react";
import UserModal from "../users/UserModal";

export default function UserCardGrid({ users }: { users: CardUserType[] }) {
  const [showSearch, setShowSearch] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [openModal, setOpenModal] = useState(false)
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 6 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar className="user-toolbar">
          <Typography variant="h5" sx={{ fontWeight: "700" }}>
            Card
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
                onChange={(e) => setSearchText(e.target.value)}
                className={`user-toolbar__search-input ${showSearch
                  ? "user-toolbar__search-input--open"
                  : "user-toolbar__search-input--closed"
                  }`}
              />
            </Box>


            <Button
              variant="contained"
              startIcon={<AddCircle />}
              onClick={() => setOpenModal(true)}
            >
              Add User
            </Button>
          </Box>
        </Toolbar>

        <Grid container spacing={3} justifyContent="center">
          {users.map((user) => (
            <Grid size={{
              xs: 12, sm: 6, md: 4, lg: 3
            }} key={user.id}>
              <UserCard user={user} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <UserModal
        open={openModal}
        onClose={() => {
          setOpenModal(false)
        }}
      />
    </Box>
  );
}
