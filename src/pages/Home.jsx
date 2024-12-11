import { NavLink } from 'react-router-dom'

export function Home() {
    return (
        <section className="home">
            <div></div>
            <nav>
                <NavLink to={"/"}> Home </NavLink>
                <NavLink to={"/about-us"}> About Us </NavLink>
                <NavLink to={"/email-index"}> Gmail </NavLink>
            </nav>
        </section>
    )
}
