import * as React from "react";

function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="container">
      <header><h1>My Web</h1></header>
      <main>{children}</main>
      <footer style={{ marginTop: 24, opacity: 0.6 }}>
      </footer>
    </div>
  );
}

export default Layout;
