import { Outlet, NavLink } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <nav>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Posts
        </NavLink>
      </nav>
      <Outlet />
    </Layout>
  );
}

export default App;
