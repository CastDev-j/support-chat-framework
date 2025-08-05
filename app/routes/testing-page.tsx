import { NavLink } from "react-router";
import type { Route } from "./+types/testing-page";
import { FaSpinner } from "react-icons/fa";
import { sleep } from "~/lib/sleep";
import { cn } from "~/lib/utils";

export async function loader({ params }: Route.LoaderArgs) {
  const {} = params;

  console.log("Loader function executed on the server");

  return { message: "Hola mundo desde el loader - Server" };
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  await sleep(1500);

  return {
    clientMessage: "Hola mundo desde el clientloader - Client",
  };
}

export function HydrateFallback() {
  return (
    <>
      <title>Cargando...</title>
      <meta name="description" content="Cargando el componente de prueba." />

      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="flex flex-col items-center space-y-4 p-8 bg-white rounded-lg shadow-lg">
          <FaSpinner className="animate-spin h-10 w-10 text-blue-600" />
          <h2 className="text-xl font-semibold text-blue-700">
            Cargando el componente...
          </h2>
          <p className="text-gray-500">Por favor espera un momento.</p>
        </div>
      </div>
    </>
  );
}

clientLoader.hydrate = true as const;

export function headers() {
  return {
    "X-Stretchy-Pants": "its for fun",
    "Cache-Control": "max-age=300, s-maxage=3600",
  };
}

export function links() {
  return [];
}

export default function TestingPage({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  return (
    <>
      <title>Página de Prueba | Soporte Chat Framework</title>
      <meta name="description" content="Página de prueba con React Router." />

      <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          ¡Bienvenido a mi ruta con props!
        </h1>
        <div className="space-y-4 text-gray-700">
          <div>
            <span className="font-semibold">Argumentos:</span>
            <pre className="bg-gray-100 rounded p-2 mt-1 text-sm overflow-x-auto">
              {JSON.stringify(false, null, 2)}
            </pre>
          </div>
          <div>
            <span className="font-semibold">Datos del Loader:</span>
            <pre className="bg-gray-100 rounded p-2 mt-1 text-sm overflow-x-auto">
              {JSON.stringify(loaderData, null, 2)}
            </pre>
          </div>
          <div>
            <span className="font-semibold">Datos de la Acción:</span>
            <pre className="bg-gray-100 rounded p-2 mt-1 text-sm overflow-x-auto">
              {JSON.stringify(actionData, null, 2)}
            </pre>
          </div>
          <div>
            <span className="font-semibold">Parámetros de Ruta:</span>
            <pre className="bg-gray-100 rounded p-2 mt-1 text-sm overflow-x-auto">
              {JSON.stringify(params, null, 2)}
            </pre>
          </div>
          <div>
            <span className="font-semibold">Rutas Matcheadas:</span>
            <pre className="bg-gray-100 rounded p-2 mt-1 text-sm overflow-x-auto">
              {JSON.stringify(matches, null, 2)}
            </pre>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <NavLink
            to="/"
            className={({ isPending }) =>
              cn(
                "flex-1 text-center border border-blue-600 text-blue-600 bg-transparent px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors shadow",
                { "opacity-50 pointer-events-none": isPending }
              )
            }
          >
            Ruta con Argumentos y Props
          </NavLink>
          <NavLink
            to="/"
            className={({ isPending }) =>
              cn(
                "flex-1 text-center border border-blue-600 text-blue-600 bg-transparent px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors shadow",
                { "opacity-50 pointer-events-none": isPending }
              )
            }
          >
            Ruta sin Argumentos y Props
          </NavLink>
        </div>
      </div>
    </>
  );
}
