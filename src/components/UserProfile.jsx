import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const UserProfile = () => {
  const { user } = useSelector((state) => state.user)

  return (
    <div className="dropdown">
      <button
        className="btn btn-link dropdown-toggle text-white text-decoration-none"
        type="button"
        id="userDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src={user.avatar || "/placeholder.svg?height=30&width=30"}
          alt={user.name}
          className="rounded-circle me-2"
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
        />
        {user.name}
      </button>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
        <li>
          <Link to="/favorites" className="dropdown-item">
            My Favorites
          </Link>
        </li>
        <li>
          <Link to="/my-events" className="dropdown-item">
            My Events
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default UserProfile

