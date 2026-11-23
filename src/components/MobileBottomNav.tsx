import { Home, User, Hammer, Code2, FolderGit2, MessageSquare } from "lucide-react";

export const MOBILE_TABS = [
  { id: "hero", label: "Home", title: "CvSuhail", icon: Home },
  { id: "about", label: "About", title: "About Me", icon: User },
  { id: "services", label: "Build", title: "What I Build", icon: Hammer },
  { id: "skills", label: "Skills", title: "Skills & Expertise", icon: Code2 },
  { id: "projects", label: "Projects", title: "Selected Work", icon: FolderGit2 },
  { id: "contact", label: "Contact", title: "Hire CvSuhail", icon: MessageSquare },
] as const;

export type MobileTabId = (typeof MOBILE_TABS)[number]["id"];

interface MobileBottomNavProps {
  activeTab: MobileTabId;
  onSelect: (id: MobileTabId) => void;
}

const MobileBottomNav = ({ activeTab, onSelect }: MobileBottomNavProps) => (
  <nav
    aria-label="Sections"
    className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border pb-[env(safe-area-inset-bottom,0px)]"
  >
    <div className="grid grid-cols-6 h-16">
      {MOBILE_TABS.map(({ id, label, icon: Icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            aria-current={active ? "page" : undefined}
            className={`flex flex-col items-center justify-center gap-1 transition-colors active:scale-95 ${
              active ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <span
              className={`flex h-7 w-12 items-center justify-center rounded-full transition-colors ${
                active ? "bg-secondary" : ""
              }`}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.4 : 1.8} />
            </span>
            <span className={`text-[10px] font-heading leading-none ${active ? "font-semibold" : "font-medium"}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  </nav>
);

export default MobileBottomNav;
