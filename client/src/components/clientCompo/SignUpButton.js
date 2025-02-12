import React from 'react';
import { NavLink } from 'react-router-dom';

const SignUp = () => {
    return (
        <NavLink to="/signup">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
                Sign Up
            </button>
        </NavLink>

    );
}

export default SignUp;
