import { NavLink } from "react-router-dom"
import useFetch from "../useFetch"
import { useState } from "react"

export const Header = () => {
    const [search,setSearch] = useState('Tech Conference');
    console.log(search);
    const { data, loading } = useFetch( `http://localhost:4000/events/title/${search}` )
    console.log(data);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Meetup</NavLink>
            </div>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search by title and tag" aria-label="Search"
                    onChange={ ( e ) => setSearch( e.target.value ) }
                />
            </form>
        </nav>
    )
}