import { ListSubheader, Divider } from "@mui/material";

export default function SidebarSectionTitle({ open, title }: { open: boolean; title: string }) {
  return open ? (
    <ListSubheader
      disableSticky
      sx={{
        fontSize: 12,
        fontWeight: 600,
        lineHeight: "24px",
        letterSpacing: "0.08em",
        color: "text.secondary",
      }}
    >
      {title}
    </ListSubheader>
  ) : (
    <Divider sx={{ my: 1 }} />
  );
}
