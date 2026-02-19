import "../css/navbar.css";
import { Link, useLocation } from "react-router-dom";
import {
    MdLocalShipping,
    MdPerson,
    MdLogout,
    MdMenu,
    MdClose,
} from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaTrailer } from "react-icons/fa";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setIsOpen(false);
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Möchten Sie sich wirklich abmelden?");
        if (confirmLogout) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        if (isMobile) {
            setIsOpen(false);
        }
    };

    return (
        <>
            {isMobile && (
                <>
                    <button
                        className={`mobile-menu-toggle ${isOpen ? "hidden" : ""}`}
                        onClick={toggleMenu}
                    >
                        <MdMenu size={24} />
                    </button>
                    {isOpen && (
                        <div className="mobile-menu-overlay" onClick={closeMenu}></div>
                    )}
                </>
            )}

            <nav
                className={`container-fluid d-flex flex-column main-block ${isOpen ? "active" : ""
                    }`}
            >
                <div className="w-100 flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Portus Dashboard</h5>
                        {isMobile && isOpen && (
                            <button className="navbar-close-btn" onClick={closeMenu}>
                                <MdClose size={24} />
                            </button>
                        )}
                    </div>
                    <div>
                        <h6>Liste daten:</h6>
                        <Link
                            to="/"
                            className={`nav-link p-0 ${location.pathname === "/" ? "active" : ""
                                }`}
                            onClick={closeMenu}
                        >
                            <MdLocalShipping className="nav-icon" />
                            <span>LKW Liste</span>
                        </Link>
                        <Link
                            to="/chassi"
                            className={`nav-link p-0 ${location.pathname === "/chassi" ? "active" : ""
                                }`}
                            onClick={closeMenu}
                        >
                            <FaTrailer className="nav-icon" />
                            <span>Chassi Liste</span>
                        </Link>
                        <Link
                            to="/fahrer"
                            className={`nav-link p-0 ${location.pathname === "/fahrer" ? "active" : ""
                                }`}
                            onClick={closeMenu}
                        >
                            <MdPerson className="nav-icon" />
                            <span>Fahrer Liste</span>
                        </Link>
                        <h5>-</h5>
                    </div>
                    <div>
                        <h6>Benutzer daten:</h6>
                        <Link
                            to="/profile"
                            className={`nav-link p-0 ${location.pathname === "/profile" ? "active" : ""
                                }`}
                            onClick={closeMenu}
                        >
                            <IoPersonCircleSharp className="nav-icon" />
                            <span>Benutzerprofil</span>
                        </Link>
                    </div>
                </div>

                <div className="w-100 navbar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <MdLogout className="nav-icon" />
                        <span>Abmelden</span>
                    </button>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
