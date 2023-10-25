import { UserController } from "./controller/UserController";
import { SpotifyController } from "./controller/SpotifyController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "get",
    route: "/auth/login",
    controller: SpotifyController,
    action: "login"
}, {
    method: "get",
    route: "/auth/callback",
    controller: SpotifyController,
    action: "callback"
}, {
    method: "get",
    route: "/auth/token",
    controller: SpotifyController,
    action: "token"
}]
