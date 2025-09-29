"use client";

import Header from "@/components/layout/Header";
import ActionButtons from "@/features/components/profile/ActionButtons";
import AvatarSection from "@/features/components/profile/AvatarSection";
import CoverPhoto from "@/features/components/profile/CoverPhoto";
import CreatePost from "@/features/components/profile/CreatePost";
import NotLoggedIn from "@/features/components/profile/NotLoggedIn";
import PostList from "@/features/components/profile/PostList";
import StatsSection from "@/features/components/profile/StatsSection";
import { useAuthStore } from "@/store/AuthStore";
import { Box, Paper, useTheme } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type Post = { content: string; date: string };

export default function Page() {
  const { userAcccout, logout, updateUser } = useAuthStore();
  const [coverPhoto, setCoverPhoto] = useState("");
  const [avatar, setAvatar] = useState(userAcccout?.avatar || "");
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const theme = useTheme();

  if (!userAcccout) return (
    <>
      <Header />
      <NotLoggedIn />
    </>
  );

  const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setAvatar(result);
        updateUser({ avatar: result })
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCoverUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setCoverPhoto(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCreatePost = () => {
    if (newPost.trim() === "") return;
    setPosts([{ content: newPost, date: new Date().toLocaleString() }, ...posts]);
    setNewPost("");
  };

  return (
    <Box minHeight="100vh" sx={{ bgcolor: theme.palette.background.default }}>
      <Header />
      <CoverPhoto coverPhoto={coverPhoto} onUpload={handleCoverUpload} />
      <Box display="flex" justifyContent="center" sx={{ px: { xs: 2, md: 0 } }}>
        <Paper
          sx={{
            width: { xs: "100%", md: 900 },
            mt: { xs: -6, md: -10 },
            borderRadius: 3,
            p: { xs: 2, md: 4 },
            mb: 6,
            boxShadow: theme.shadows[3],
          }}
        >
          <AvatarSection
            avatar={avatar}
            fullName={userAcccout.fullName}
            email={userAcccout.email}
            onUpload={handleAvatarUpload}
          />
          <StatsSection />
          <ActionButtons onLogout={logout} />
          <CreatePost newPost={newPost} setNewPost={setNewPost} onCreate={handleCreatePost} />
          <PostList posts={posts} />
        </Paper>
      </Box>
    </Box>
  );
}
