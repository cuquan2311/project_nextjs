import Sidebar from "./Sidebar";

export default function SidebarToggle({
  open,
  toggle,
}: {
  open: boolean;
  toggle: () => void;
}) {
  return <Sidebar open={open} toggle={toggle} />;
}
