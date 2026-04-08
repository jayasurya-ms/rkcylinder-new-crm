import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  AudioWaveform,
  Command,
  Boxes,
  Truck,
  Factory,
  BarChart3,
  FileDown,
  Cog,
  Eye,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const NAVIGATION_CONFIG = {
  COMMON: {
    Manufacturer: {
      title: "Manufacturer",
      url: "/manufacturer",
      icon: Factory,
    },
    Vendor: {
      title: "Vendor",
      url: "/vendor",
      icon: Truck,
    },
    Cylinder: {
      title: "Cylinder",
      url: "/cylinder",
      icon: Boxes,
    },
    ViewCylinder: {
      title: "View Cylinder",
      url: "/view-cylinder",
      icon: Eye,
    },
    SETTINGS: {
      title: "Settings",
      url: "/settings",
      icon: Cog,
    },
    REPORTS: {
      title: "Reports",
      url: "#",
      icon: BarChart3,
      items: [
        {
          title: "Vendor Report",
          url: "/report/vendor",
          icon: FileDown,
        },
        {
          title: "Manufacturer Report",
          url: "/report/manufacturer",
          icon: FileDown,
        },
        {
          title: "Cylinder Details",
          url: "/report/cylinder-details",
          icon: FileDown,
        },
        {
          title: "Report",
          url: "/report/general",
          icon: FileDown,
        },
      ],
    },
  },
};

const useNavigationData = (userType) => {
  return useMemo(() => {
    const navMain = [
      NAVIGATION_CONFIG.COMMON.Manufacturer,
      NAVIGATION_CONFIG.COMMON.Vendor,
      NAVIGATION_CONFIG.COMMON.Cylinder,
      NAVIGATION_CONFIG.COMMON.ViewCylinder,
      NAVIGATION_CONFIG.COMMON.REPORTS,
      NAVIGATION_CONFIG.COMMON.SETTINGS,
    ];

    return { navMain };
  }, [userType]);
};

const Logo = ({ className }) => (
  <img src="/fevicon.png" alt="Logo" className={className} />
);

const TEAMS_CONFIG = [
  {
    name: "Rk Cylinder",
    logo: Logo,
    plan: "",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
];

export function AppSidebar({ ...props }) {
  const [openItem, setOpenItem] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const { navMain, navMainReport } = useNavigationData(user?.user_type);
  const initialData = {
    user: {
      name: user?.name || "User",
      email: user?.email || "user@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: TEAMS_CONFIG,
    navMain,
    navMainReport,
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={initialData.teams} />
      </SidebarHeader>
      <SidebarContent className="sidebar-content">
        <NavMain
          items={initialData.navMain}
          openItem={openItem}
          setOpenItem={setOpenItem}
        />
        {/* <NavMainReport
          items={initialData.navMainReport}
          openItem={openItem}
          setOpenItem={setOpenItem}
        /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={initialData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export { NAVIGATION_CONFIG };
