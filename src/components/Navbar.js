import React from 'react'

const Navbar = (props) => (
    <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
        <div className="navbar-brand col-1">
        </div>

        <div className="form-group justify-content-center row col-10 my-2">
            <input
                value={props.searchString}
                onChange={(e) => {
                    props.searchRecipeFn(e.target.value);
                    e.preventDefault();
                }}
                className="form-control col-9 mr-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
            />
        </div>
    </nav>
)

export default Navbar;
