import { Routes } from "@angular/router";
import { Forum } from "./forum";
import { PublicChannel } from "./public-channel/public-channel";
import { ForumToolbar } from "./forum-toolbar/forum-toolbar";


export const routes: Routes = [
  {
    path: "",
    component: ForumToolbar,
    children: [
      {
        path: "public",
        component: PublicChannel,
      }
    ]
  }
]
