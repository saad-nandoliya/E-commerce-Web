import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("isLogged");
        navigate("/admin/login");
    };
    return (
        <>

            <button
                onClick={handleLogout}
                className="flex items-center space-x-4 p-[13px] "
            >
                <i className="bx bxs-log-out-circle text-red-600"></i>
                <span>Logout</span>
            </button>

        </>
    );
};

export default LogoutButton;
