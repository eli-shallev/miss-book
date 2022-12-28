const { NavLink } = ReactRouterDOM

export function AppHeader() {
    return <header className="app-header">
        <h1>My App</h1>
        <NavLink className='header-link' to="/">Home</NavLink> |
        <NavLink className='header-link' to="/book">Book</NavLink> |
        <NavLink className='header-link' to="/about">About</NavLink>
    </header>
}