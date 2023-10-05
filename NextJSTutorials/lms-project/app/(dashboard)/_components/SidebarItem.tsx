import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import path from "path";

interface SidebarItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
}

const SidebarItem = ({ label, href, icon: Icon }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname.startsWith(`${href}/`);
  return (
    <button
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20"
      )}
      onClick={onClick}
      type="button"
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          className={cn("text-slate-500", isActive && "text-sky-700")}
          size={22}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700  h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default SidebarItem;
