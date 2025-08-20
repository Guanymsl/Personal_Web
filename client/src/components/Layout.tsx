import * as React from "react";
import { useNavigate } from "react-router-dom";

function Layout({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();

  const isAuthed = Boolean(sessionStorage.getItem("authToken"));

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="container">
      <header>
        <h1>My Web</h1>
      </header>
      {isAuthed && <button onClick={handleLogout}>Log Out</button>}
      <main>{children}</main>
      <footer style={{ marginTop: 24, opacity: 0.6 }}></footer>
    </div>
  );
}

export default Layout;
