import logo from "../assets/imgs/logo.png";
import { Link, NavLink } from "react-router";
const Header = () => {
    return (
        <>
            <header className="header">
                <div className="content">
                    <Link to="/">
                        <img src={logo} alt="" className="logo" />
                    </Link>
                    <nav className="menu">
                        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")} end>
                            HomePage
                        </NavLink>
                        <NavLink to="/add" className={({ isActive }) => (isActive ? "active" : "")} end>
                            Add new
                        </NavLink>
                        <a href="#!">Business</a>
                        <a href="#!">Society</a>
                        <a href="#!">About</a>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
