import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'; // Assuming you have this hook

const NavBar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  const handleLogout = () => {
    // Perform logout
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold px-4"> {/* Added padding */}
          <h1>StuAdmin</h1>
        </Link>
        <nav className="flex items-center space-x-4">
          {user ? (
            <button onClick={handleLogout} className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-700"> {/* Added padding and rounded corners */}
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-700"> {/* Added padding and rounded corners */}
                Login
              </Link>
              <Link to="/register" className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-700"> {/* Added padding and rounded corners */}
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
