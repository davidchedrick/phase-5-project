function Header({ handleLogout }) {
    return (
        <>
            <h1>Header</h1>
            <p>
                <button onClick={handleLogout}>Logout</button>
            </p>
        </>
    );
}

export default Header;
