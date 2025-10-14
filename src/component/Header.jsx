import { NavLink } from "react-router-dom"

export const Header = ( { search, setSearch } ) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Meetup</NavLink>
            </div>
            <form className="d-flex" role="search" onSubmit={ ( e ) => e.preventDefault() }>
                <input className="form-control me-2" type="search" placeholder="Search by title and tag" aria-label="Search"
                    onChange={ ( e ) => setSearch( e.target.value ) }
                />
            </form>
        </nav>
    )
}