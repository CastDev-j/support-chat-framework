import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  // Auth
  ...prefix("auth", [
    layout("./layouts/auth-layout.tsx", [
      route("login", "routes/auth/login-page.tsx"),
      route("register", "routes/auth/register-page.tsx"),
    ]),
  ]),

  // Chat
  ...prefix("chat", [
    layout("./layouts/chat-layout.tsx", [
      index("routes/chat/no-chat-selected.tsx"),
      route(":clientId", "routes/chat/chat-page.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
