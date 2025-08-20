import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import NewPost from "./pages/NewPost";
import LogIn from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "posts", element: <Posts /> },
      { path: "posts/:id", element: <PostDetail /> },
      { path: "new", element: <NewPost /> },
      { path: "login", element: <LogIn /> },
    ],
  },
]);
