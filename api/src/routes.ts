import { SpotifyController } from "./controller/SpotifyController";

export const Routes = [{
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
