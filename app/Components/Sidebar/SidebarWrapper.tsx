"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function SidebarWrapper() {
  const pathname = usePathname();

  const hideSidebar = pathname === "/signin" || pathname === "/signup";

  if (hideSidebar) return null;
  return <Sidebar />;
}
