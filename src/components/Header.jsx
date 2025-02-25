import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-dark text-white py-3">
      <nav className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="text-white text-decoration-none">
            <h1 className="h4 m-0">GameExplorer</h1>
          </Link>
          <ul className="nav">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/games" className="nav-link text-white">
                Games
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/publishers" className="nav-link text-white">
                Publishers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tags" className="nav-link text-white">
                Tags
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header

