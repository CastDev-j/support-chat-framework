import { Form, Link, redirect, useNavigation } from "react-router";

import { destroySession, getSession } from "~/sessions.server";
import type { Route } from "./+types/logout-page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { FiLogOut, FiX } from "react-icons/fi";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) return redirect("/auth/login");


  return {};
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/auth/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export default function LogoutRoute() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center pb-2">
          <FiLogOut className="text-red-500 mb-2" size={32} />
          <CardTitle className="text-center text-lg font-semibold">
            Estás a punto de cerrar sesión
          </CardTitle>
          <CardDescription className="text-center mt-1 text-gray-500">
            ¿Estás seguro que deseas cerrar tu sesión?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" className="flex flex-col gap-6">
            <Button
              type="submit"
              disabled={isNavigating}
              variant="destructive"
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600"
            >
              <FiLogOut className="text-white" size={20} />
              Cerrar sesión
            </Button>
            <Link
              to="/chat"
              className="w-full flex items-center justify-center gap-2 text-sm underline underline-offset-4 text-gray-500 hover:text-gray-700"
            >
              <FiX className="text-gray-400" size={18} />
              {isNavigating ? "Regresando..." : "Cancelar"}
            </Link>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
