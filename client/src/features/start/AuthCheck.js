import { BrowserRouter as Router } from "react-router-dom";
import AuthenticatedApp from "../../AuthenticatedApp";
import UnauthenticatedApp from "../../UnauthenticatedApp";

function AuthCheck({ currentUser, setFetchUser }) {
    return (
        <Router>
            {currentUser?.id ? (
                <AuthenticatedApp
                    currentUser={currentUser}
                    setFetchUser={setFetchUser}
                />
            ) : (
                <UnauthenticatedApp />
            )}
        </Router>
    );
}

export default AuthCheck;
