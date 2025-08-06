import { FaRegComments } from "react-icons/fa";
import { useNavigation } from "react-router";
import { ChatPageSkeleton } from "./chat-page";

const NoChatSelected = () => {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <>
      {isNavigating ? (
        <ChatPageSkeleton />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <FaRegComments className="text-6xl text-muted-foreground" />
            <h2 className="text-2xl font-semibold text-muted-foreground">
              Ningún chat seleccionado
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Selecciona una conversación a la izquierda para comenzar a chatear
            con tus clientes.
            <br />
          </p>
        </div>
      )}
    </>
  );
};

export default NoChatSelected;
