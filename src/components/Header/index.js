import { useNavigate } from "react-router-dom";
const Header = ({ children }) => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-success mb-3">
        <div className="navbar-brand m-auto fw-bold">
          <h1 className="text-light">GitHub Jobs</h1>
        </div>
        <button
          type="button"
          class="btn btn-danger"
          style={{ marginRight: "80px" }}
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </nav>
      {children}
    </>
  );
};

export default Header;
