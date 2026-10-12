import { Outlet } from "react-router-dom";

export const Layout = ({ header: Header, footer: Footer }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main role="main" className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
