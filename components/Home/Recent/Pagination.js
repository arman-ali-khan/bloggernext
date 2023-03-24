const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize); // 100/10

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div>
      <div className="btn-group flex flex-wrap">
        {pages.map((page) => (
          <button
            className={`btn btn-sm ${page === currentPage ? "btn-active" : ""}`}
          >
            <a className={styles.pageLink} onClick={() => onPageChange(page)}>
              {page}
            </a>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
