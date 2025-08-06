import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  data,
  Form,
  Link,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router";
import type { Route } from "./+types/login-page";
import { getSession, commitSession } from "~/sessions.server";
import { loginUser } from "~/fake/fake-data";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) return redirect("/chat");

  return data(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const emailInput = form.get("email");
  const passwordInput = form.get("password");

  if (emailInput == "error@error.error") {
    session.flash("error", "Invalid email/password");
    return redirect("/auth/login?error=Invalid Email", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const { id, token, name, email } = await loginUser();

  session.set("userId", id);
  session.set("token", token);
  session.set("name", name);
  session.set("email", email);

  // Login succeeded, send them to the home page.
  return redirect("/chat", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

const LoginPage = ({ className, ...props }: React.ComponentProps<"div">) => {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Inicia sesión en tu cuenta</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico abajo para iniciar sesión en tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@ejemplo.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link
                    to="#"
                    className={cn(
                      "ml-auto inline-block text-sm underline-offset-4 hover:underline",
                      isNavigating &&
                        "cursor-not-allowed pointer-events-none opacity-50"
                    )}
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input name="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isNavigating}
                >
                  {isNavigating ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={isNavigating}
                >
                  Iniciar sesión con Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/auth/register"
                className={cn(
                  "underline underline-offset-4",
                  isNavigating &&
                    "cursor-not-allowed pointer-events-none opacity-50"
                )}
              >
                Regístrate
              </Link>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
