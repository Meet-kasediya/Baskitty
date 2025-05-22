import type { FC } from 'react';

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  totalItems: number;
  onCartClick: () => void;
}

const Navbar: FC<NavbarProps> = ({ searchTerm, setSearchTerm, totalItems, onCartClick }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="./header.png" alt="BASKITTY" className="header" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Search */}
          <form className="d-flex w-100 me-3" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn" type="submit">
              <img src="./paw.png" className="header" alt="Search" />
            </button>
          </form>

          {/* Icons */}
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-bell fs-5"></i>
            <button className="btn position-relative" onClick={onCartClick}>
              <i className="bi bi-cart fs-5"></i>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </button>
            <i className="bi bi-person-circle fs-5"></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
