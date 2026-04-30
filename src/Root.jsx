import { Outlet, NavLink } from "react-router";
// import "./Root.css";

function Root() {
  return (
    <div className="app">
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/products">Products</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <nav>
          <NavLink to="/">Home</NavLink>
          {/* <NavLink to="/about">About</NavLink>
          <NavLink to="/products">Products</NavLink> */}
        </nav>
        <p>Copyright 2026</p>
      </footer>
    </div>
  );
}

export default Root;
