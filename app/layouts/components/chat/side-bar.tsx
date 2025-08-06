import { ScrollArea } from "@radix-ui/react-scroll-area";
import { LogOut } from "lucide-react";
import { FiX } from "react-icons/fi";
import { Link, NavLink, useNavigate, useNavigation } from "react-router";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import type { Client } from "~/interface/chat/chat-interfaces";
import { cn } from "~/lib/utils";

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  clients: Client[];
  isLoading?: boolean;
  userName?: string;
}

// Colores contrastantes para los avatares
const bgColors = [
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-indigo-500",
];

const getColorClass = (index: number) => bgColors[index % bgColors.length];

export const ChatSideBar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  clients,
  isLoading,
  userName,
}: Props) => {
  const navigate = useNavigate();

  const handleCloseSession = () => {
    navigate("/auth/logout", { replace: true });
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r px-4 space-y-4 transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:block",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-14 flex items-center justify-between border-b px-4">
        <Link
          to={"/chat"}
          className="flex items-center gap-2"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div className="h-6 w-6 rounded-full bg-primary" />
          <span className="font-semibold">{userName}</span>
        </Link>
        <Button
          size="icon"
          variant="ghost"
          className="lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FiX className="w-4 h-4" />
        </Button>
      </div>

      {isLoading ? (
        <SideBarSkeleton />
      ) : (
        <ContactList clients={clients} setIsSidebarOpen={setIsSidebarOpen} />
      )}

      <div className="absolute bottom-0 left-0 right-0 border-t bg-background py-3 px-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-full flex items-center gap-2 justify-start text-destructive"
          onClick={handleCloseSession}
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Cerrar sesión</span>
        </Button>
      </div>
    </div>
  );
};

const ContactList = ({
  clients,
  setIsSidebarOpen,
}: {
  clients: Client[];
  setIsSidebarOpen: (open: boolean) => void;
}) => {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <ScrollArea className="overflow-y-auto max-h-[calc(100vh-64px)] pr-1">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold px-2">Contactos</h3>
          <div className="space-y-1">
            {clients.map(({ id, name }, index) => (
              <NavLink
                key={id}
                to={`chat/${id}`}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center py-2 px-2 rounded text-sm transition-all",
                    isActive && !isNavigating && "font-semibold bg-accent"
                  )
                }
              >
                <div
                  className={cn(
                    "h-6 w-6 rounded-full mr-2 flex items-center justify-center text-white text-xs",
                    getColorClass(index)
                  )}
                >
                  {name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
                {name}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <h3 className="px-2 text-sm font-semibold mb-1">Recientes</h3>
          {clients.slice(0, 2).map(({ id, name }, index) => (
            <NavLink
              key={id}
              to={`chat/${id}`}
              className={({ isActive }) =>
                cn(
                  "flex items-center py-2 px-2 rounded text-sm transition-all",
                  isActive && "font-semibold bg-accent"
                )
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <div
                className={cn(
                  "h-6 w-6 rounded-full mr-2 flex items-center justify-center text-white text-xs",
                  getColorClass(Math.floor(Math.random() * bgColors.length))
                )}
              >
                {name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </div>
              {name}
            </NavLink>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

const SideBarSkeleton = () => (
  <ScrollArea className="overflow-y-auto max-h-[calc(100vh-64px)] pr-1">
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold px-2">Contactos</h3>
        <div className="space-y-1">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center py-2 px-2 rounded text-sm transition-all"
            >
              <Skeleton className={cn("h-6 w-6 rounded-full mr-2")} />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
      <div className="pt-4 border-t">
        <h3 className="px-2 text-sm font-semibold mb-1">Recientes</h3>
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="flex items-center py-2 px-2 rounded text-sm transition-all"
          >
            <Skeleton className={cn("h-6 w-6 rounded-full mr-2")} />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  </ScrollArea>
);
