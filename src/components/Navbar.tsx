import { useState } from 'react';
import type { FC } from 'react';

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  totalItems: number;
}

const Navbar: FC<NavbarProps> = ({
  searchTerm,
  setSearchTerm,
  totalItems,
  onCartClick,
}) => {
  // true means collapsed (closed)
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const closeNavbar = () => {
    setIsNavCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="./header.png" alt="BASKITTY" style={{ height: '30px' }} />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse${!isNavCollapsed ? ' show' : ''}`}
          id="navbarSupportedContent"
        >

          <form
            className="d-flex flex-column flex-lg-row w-100 me-lg-3 mb-3 mb-lg-0"
            onSubmit={(e) => e.preventDefault()}
            onClick={closeNavbar} 
          >
            <input
              className="form-control me-lg-2 mb-2 mb-lg-0"
              type="search"
              placeholder="Search for fresh fruits, veggies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn" type="submit" aria-label="Search">
              <img src="./paw.png" style={{ height: '25px' }} alt="Search" />
            </button>
          </form>

          <div className="d-flex align-items-center gap-3 ms-lg-auto">
            <i className="bi bi-bell fs-5" aria-label="Notifications"></i>

            <button
              className="btn position-relative"
              onClick={() => {
                onCartClick();
                closeNavbar(); 
              }}
              aria-label={`Cart with ${totalItems} items`}
            >
              <i className="bi bi-cart fs-5"></i>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
    