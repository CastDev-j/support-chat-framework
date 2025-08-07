import { FiMail, FiUserCheck, FiX } from "react-icons/fi";
import { useNavigation } from "react-router";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import type { Client } from "~/interface/chat/chat-interfaces";
import { cn } from "~/lib/utils";

interface Props {
  isRightPanelOpen: boolean;
  setIsRightPanelOpen: (open: boolean) => void;
  isLoading?: boolean;
  client: Client | null;
}

export const RightPanel = ({
  isRightPanelOpen,
  setIsRightPanelOpen,
  isLoading,
  client,
}: Props) => {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  const isSubmitting = navigation.state === "submitting";

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-30 w-80 bg-background border-l transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:block",
        isRightPanelOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="h-14 border-b px-4 flex items-center justify-between">
        <h2 className="font-medium">Detalles de contacto</h2>
        <Button
          size="icon"
          variant="ghost"
          className="lg:hidden"
          onClick={() => setIsRightPanelOpen(false)}
        >
          <FiX className="w-4 h-4" />
        </Button>
      </div>

      {isLoading || isNavigating ? (
        <RightPanelSkeleton />
      ) : client ? (
        <ClientProfile client={client} />
      ) : (
        <NoClientSelected />
      )}
    </div>
  );
};

export default RightPanel;

const ClientProfile = ({ client }: { client: Client }) => {
  const { address, currentPlan, email, id, memberSince, name, phone } = client;

  return (
    <div className="p-4">
      <div className="flex flex-col items-center pb-6 border-b">
        <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl mb-3">
          {name?.[0] || id}
        </div>
        <h3 className="font-semibold text-lg">{name || `Cliente ${id}`}</h3>
        <p className="text-sm text-muted-foreground">
          {currentPlan || "Sin plan"}
        </p>
        <div className="flex items-center mt-1">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-1" />
          <span className="text-xs text-muted-foreground">En línea</span>
        </div>
      </div>

      <div className="py-4 space-y-4 text-sm">
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-1">
            <FiMail className="w-4 h-4" /> Información de contacto
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Correo:</span>
              <span>{email || "No disponible"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Teléfono:</span>
              <span>{phone || "No disponible"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dirección:</span>
              <span>{address || "No disponible"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID Cliente:</span>
              <span>{id}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2 flex items-center gap-1">
            <FiUserCheck className="w-4 h-4" /> Detalles de la cuenta
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plan:</span>
              <span>{currentPlan || "No disponible"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Miembro desde:</span>
              <span>
                {" "}
                {memberSince
                  ? new Date(memberSince).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "No disponible"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <Button variant="outline" size="sm" className="w-full">
          Ver perfil completo
        </Button>
      </div>
    </div>
  );
};

const NoClientSelected = () => {
  return (
    <div className=" p-4 flex flex-col items-center justify-center h-full text-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <FiUserCheck className="text-6xl text-muted-foreground" />
        <h2 className="text-2xl font-semibold text-muted-foreground">
          Ningún cliente seleccionado
        </h2>
      </div>
      <p className="text-muted-foreground max-w-md">
        Selecciona un cliente a la izquierda para ver sus detalles de contacto.
      </p>
    </div>
  );
};

const RightPanelSkeleton = () => {
  return (
    <div className="p-4 animate-pulse">
      <div className="flex flex-col items-center pb-6 border-b">
        <Skeleton className="h-20 w-20 rounded-full mb-3" />
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-24 mb-1" />
        <Skeleton className="h-4 w-20" />
      </div>

      <div className="py-4 space-y-4 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
};
