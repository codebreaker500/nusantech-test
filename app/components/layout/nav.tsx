
import {
  type Icon,
} from "@tabler/icons-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { useCategory } from "~/hooks/use-category"

export function NavType({
  items,
}: {
  items: {
    name: string
    url: string
    icon: Icon
  }[]
}) {

  const category = useCategory();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Category</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={`/${item.url}`}>
                <item.icon />
                <span className={
                  category === item.url
                    ? "font-bold"
                    : "text-muted-foreground"
                }>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
