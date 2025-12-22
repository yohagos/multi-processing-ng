import { Routes } from "@angular/router";
import { Forum } from "./forum";
import { PublicChannel } from "./public-channel/public-channel";


export const routes: Routes = [
  {
    path: "",
    component: Forum,
    children: [
      {
        path: "public",
        component: PublicChannel,
      }
    ]
  }
]
