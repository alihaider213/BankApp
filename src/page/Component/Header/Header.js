import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#1565c0"}}>
                <div className="container">
                    <Link to='/' className="navbar-brand">My Bank</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link active" >Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/accounts" className="nav-link active">Accounts</Link>
                            </li>
                           
                            <li className="nav-item">
                                <Link to="/transaction" className="nav-link active">Transactions</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
