
import * as React from "react"
import {
  IconBadgeHd,
  IconBrandNetflix,
  IconClockPause,
  IconHeartStar,
  IconInnerShadowTop,
} from "@tabler/icons-react"

import { NavType } from "./nav"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"

const data = {
  main: [
    {
      name: "Now Playing",
      url: "now_playing",
      icon: IconBadgeHd,
    },
    {
      name: "Popular",
      url: "popular",
      icon: IconBrandNetflix,
    },
    {
      name: "Top Rated",
      url: "top_rated",
      icon: IconHeartStar,
    },
    {
      name: "Upcoming",
      url: "upcoming",
      icon: IconClockPause,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Movie - Nusantech</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavType items={data.main} />
      </SidebarContent>
    </Sidebar>
  )
}
