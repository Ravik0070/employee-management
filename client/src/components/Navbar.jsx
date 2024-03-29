import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import dateHelper from "../utils/dateHelper";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div>
        <h1>Employee Management System</h1>
      </div>
      <div>
        {currentUser && (
          <>
            <div>
              {currentUser?.loginHistory.length > 1 && (
                <p>
                  Last Login: &nbsp;
                  {dateHelper(
                    currentUser.loginHistory[
                      currentUser.loginHistory.length - 2
                    ]
                  )}
                </p>
              )}
            </div>
            <div>
              <button onClick={logout}>Logout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
