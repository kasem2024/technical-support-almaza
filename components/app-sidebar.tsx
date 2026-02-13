'use client'

import {  ChevronDown, User2 } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation"

import {
  Wrench,
  BellPlus
} from "lucide-react"
import Link from "next/link"

// Sidebar sections with unique icon colors
const sections = [
  {
    title: "بلاغات",
    items: [
      { title: "تسجيل بلاغ", url: "/report", icon: BellPlus , activeBg: "bg-emerald-600", activeText: "text-white", iconColor: "text-violet-500" } 
    ]
    },
  {
    title: "أستلام",
    items: [
      { title: "متابعة الإستلام", url: "/status", icon: Wrench, activeBg: "bg-emerald-600", activeText: "text-white", iconColor: "text-emerald-500" },
    ]
  },
 
]

export function AppSidebar() {

  const pathname = usePathname()

  const renderMenuItem = (item: { title: string; url: string; icon: React.ComponentType<{ className: string }>; activeBg: string; activeText: string; iconColor: string }) => {
    const isActive = pathname === item.url
    const IconComponent = item.icon

    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <a
            href={item.url}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300
              font-medium truncate
              ${isActive ? `${item.activeBg} ${item.activeText} shadow-lg` : "text-gray-700 hover:bg-gray-100 hover:text-gray-800"}
            `}
          >
            <span className={`p-2 rounded-md ${isActive ? "bg-white/20 text-white" : "bg-gray-100"} ${isActive ? "" : item.iconColor}`}>
              <IconComponent className="w-5 h-5" />
            </span>
            <span className={`${isActive ? "text-white font-semibold" : ""}`}>{item.title}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Sidebar className="bg-white border-r border-gray-200 rtl">
      <SidebarContent className="flex flex-col justify-between h-full">
        <div>
          <SidebarGroup>
            <SidebarGroupLabel className="text-2xl font-extrabold text-right px-4 py-3 tracking-wide font-['Cairo']">
              <Link href='/'>دليل الإستلام والإبلاغ </Link>
            </SidebarGroupLabel>
            <SidebarSeparator />
            {sections.map((section) => (
              <div key={section.title} className="mb-4">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map(renderMenuItem)}
                  </SidebarMenu>
                </SidebarGroupContent>
                <SidebarSeparator />
              </div>
            ))}
          </SidebarGroup>
        </div>
        <SidebarFooter className="px-4 py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="flex items-center justify-between gap-3 bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg hover:brightness-110 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <User2 />
                  {"إدارة النظم والرقمنة"}
                </div>
               
              </SidebarMenuButton>
            </DropdownMenuTrigger>

          </DropdownMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
