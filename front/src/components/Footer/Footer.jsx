import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer py-3 border-top">
      <div className="container d-flex justify-content-center">
        <Link to="/" className="btn text-decoration-none text-dark">
          Home
        </Link>
      </div>
    </footer>
  );
};
