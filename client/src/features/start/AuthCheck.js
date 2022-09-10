import { BrowserRouter as Router } from "react-router-dom";
import AuthenticatedApp from "../../AuthenticatedApp";
import UnauthenticatedApp from "../../UnauthenticatedApp";

function AuthCheck({ currentUser }) {
    return (
        <Router>
            {currentUser?.id ? (
                <AuthenticatedApp currentUser={currentUser} />
            ) : (
                <UnauthenticatedApp />
            )}
        </Router>
    );
}

export default AuthCheck;
