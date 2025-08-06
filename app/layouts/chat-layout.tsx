import {
  Outlet,
  redirect,
  useParams,
  type ClientLoaderFunctionArgs,
} from "react-router";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { FiMenu, FiInfo } from "react-icons/fi";
import { ChatSideBar } from "./components/chat/side-bar";
import { RightPanel } from "./components/chat/right-panet";
import { cn } from "~/lib/utils";
import { getClient, getClients } from "~/fake/fake-data";
import type { Route } from "./+types/chat-layout";
import { ChatPageSkeleton } from "~/routes/chat/chat-page";
import { getSession } from "~/sessions.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) return redirect("/auth/login");

  const name = session.get("name");
  const email = session.get("email");

  return { name, email };
}
export async function clientLoader({
  params,
  serverLoader,
}: ClientLoaderFunctionArgs) {
  const { clientId = "" } = params;
  const serverData = await serverLoader<{ name: string; email: string }>();

  const clients = await getClients();
  const client = await getClient(clientId);

  return { clients, client, user: { ...serverData } };
}

export function HydrateFallback() {
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
        isLoading={true}
        clients={[]}
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
          <ChatPageSkeleton />
        </main>
      </div>

      {/* PANEL DERECHO */}
      <RightPanel
        isRightPanelOpen={isRightPanelOpen}
        setIsRightPanelOpen={setIsRightPanelOpen}
        isLoading={true}
        client={null}
      />
    </div>
  );
}

clientLoader.hydrate = true as const;

const ChatLayout = ({ loaderData }: Route.ComponentProps) => {
  const { clients, client, user } = loaderData;
  console.log(user.name, user.email);

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
        clients={clients}
        userName={user.name}
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
        client={client}
      />
    </div>
  );
};

export default ChatLayout;
