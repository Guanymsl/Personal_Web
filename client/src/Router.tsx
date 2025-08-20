import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import NewPost from "./pages/NewPost";
import LogIn from "./pages/Login";
import PostsControl from "./pages/PostsControl";

import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "posts", element: <Posts /> },
      { path: "posts/:id", element: <PostDetail /> },
    ],
  },
  { path: "login", element: <LogIn /> },
  {
    path: "new",
    element: (
      <ProtectedRoute>
        <NewPost />
      </ProtectedRoute>
    ),
  },
  {
    path: "posts/control",
    element: (
      <ProtectedRoute>
        <PostsControl />
      </ProtectedRoute>
    ),
  },
]);
