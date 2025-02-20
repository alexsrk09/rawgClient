const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <nav aria-label="Page navigation" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
          </li>
          {[...Array(totalPages).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => onPageChange(number + 1)}>
                {number + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    )
  }
  
  export default Pagination
  
  