import { Routes } from "@angular/router";
import { PublicChannel } from "./public-channel/public-channel";
import { ForumToolbar } from "./forum-toolbar/forum-toolbar";
import { DirectChannel } from "./direct-channel/direct-channel";


export const routes: Routes = [
  {
    path: "",
    component: ForumToolbar,
    children: [
      {
        path: "public",
        component: PublicChannel,
      },
      {
        path: ':id',
        component: DirectChannel,
      },
    ]
  }
]
