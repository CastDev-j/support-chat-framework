import { Outlet, useParams } from "react-router";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { FiX, FiMenu, FiInfo } from "react-icons/fi";
import { ChatSideBar } from "./components/chat/side-bar";
import { RightPanel } from "./components/chat/right-panet";
import { cn } from "~/lib/utils";

const ChatLayout = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) setIsRightPanelOpen(false);
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isRightPanelOpen) setIsSidebarOpen(false);
  }, [isRightPanelOpen]);

  return (
    <div className="flex h-screen bg-background relative overflow-hidden">
      {/* BARRA LATERAL */}
      <ChatSideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* PRINCIPAL */}
      <div className="flex-1 flex flex-col overflow-hidden max-h-dvh">
        <header className="h-14 border-b px-4 flex items-center justify-between">
          <div className="flex gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FiMenu className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsRightPanelOpen(true)}
            >
              <FiInfo className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="ghost"
              size="sm"
              className={cn(!clientId && "hidden")}
            >
              Guardar conversación
            </Button>
          </div>
        </header>

        {/* OUTLET CON CONTENIDO CENTRAL DELIMITADO */}
        <main className="flex-1 overflow-auto px-2 rounded-md mx-2">
          <Outlet />
        </main>
      </div>

      {/* PANEL DERECHO */}
      <RightPanel
        isRightPanelOpen={isRightPanelOpen}
        setIsRightPanelOpen={setIsRightPanelOpen}
      />
    </div>
  );
};

export default ChatLayout;
