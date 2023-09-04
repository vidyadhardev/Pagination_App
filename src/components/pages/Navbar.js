import React from "react";
 
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <ul>
            <li>
                    <Link as={Link} to={'/home'}>Home Page</Link>
                </li>
                <li>
                    <Link as={Link} to={'/login'}>Login Page</Link>
                </li>
                <li>
                    <Link as={Link} to={'/register'}>Register</Link>
                </li>
                <li>
                    <Link as={Link} to={'/service'}>Service</Link>
                </li>

            </ul>
        </>
    )
};
export default Navbar;