
import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaUserAlt, FaIdCard } from "react-icons/fa"


export default function Login() {


    
    

    
    const [state, setState] = useState()
   // const [isProcessing, setIsProcessing] = useState(false)
    
    const handleChange = e => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        let { name, cnic, branchCode, accountNo, chooseAccount, initialDeposit } = state
        
    }
    
    return (

    <div className="container submitfrom">
                <div className="card ">

                    <div className="row">
                        <div className="col">
                            <div className='bg-primary text-center mt-4'>
                                <h3 className='text-white' >Enter Text Details Below</h3>
                                <p>All fiels are required</p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row mt-5 text-center">
                            <div className="col-lg-6 md-12 sm-12 mb-5">
                                <FaUserAlt /> <input type="text" className='input' placeholder='Full Name' name='name' onChange={handleChange} />
                            </div>
                            <div className="col-lg-6 md-12 sm-12 ">
                                <FaIdCard />  <input type="number" className='input' placeholder='CNIC Number' name='cnic' onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col text-end me-5">
                                <button className='btn btn-success mb-4' >Login</button>
                            </div>
                        </div>
                    </form>
                    <a>Need an account ? <Link to = "/registration">Register</Link> </a>
                    </div>
                    </div>


  )
}
