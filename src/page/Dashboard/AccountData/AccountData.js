//import React from 'react'

import { FaUserAlt, FaIdCard, FaInfoCircle, FaMoneyBillAlt } from "react-icons/fa"
import { BsBank } from "react-icons/bs"
import React, { useState, useContext } from 'react'
import { firestore } from "../../../config/firebase"
import { setDoc, serverTimestamp, doc } from "firebase/firestore/lite"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../../"

export default function AccountData() {
    const initialState = {
        name: "",
        cnic: "",
        branchCode: "",
        accountNo: "",
        chooseAccount: "",
        initialDeposit: ""

    }

    const navigate = useNavigate()

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleSubmit = e => {
        e.preventDefault();
        let { name, cnic, branchCode, accountNo, chooseAccount, initialDeposit } = state

        name = name.trim();
        cnic = cnic.trim();
        branchCode = branchCode.trim();
        accountNo = accountNo.trim();
        chooseAccount = chooseAccount.trim();
        initialDeposit = initialDeposit.trim();

        // if (name.length < 3) {
        //     return window.notify("Please enter your full name", "error")
        // }
        // if (cnic.length !== 13) {
        //     return window.notify("Please enter 13 digit of CNIC without dashes", "error")
        // }

        // if (branchCode.length !== 2) {
        //     return window.notify("Please Enter correct Branch Code", "error")
        // }
        // if (accountNo.length !== 9) {
        //     return window.notify("Please insert correct account no. of nine digits", "error")
        // }
        // if (chooseAccount === "") {
        //     return window.notify("Please the account type", "error")
        // }

        // if (initialDeposit < 500) {
        //     return window.notify("Please enter some amount", "error")
        // }

        setIsProcessing(true)
        let formData = { name, cnic, branchCode, accountNo, chooseAccount, initialDeposit }

        formData.dataCreated = serverTimestamp()
        formData.id = window.getRandomId()
        formData.status = "active"
        // formData.createdBy = {
        //     email: user.email,
        //     uid: user.uid
        // }
        createDocument(formData)
    }

    const createDocument = async (formData) => {

        try {
            await setDoc(doc(firestore, "Account", formData.id), formData);
            window.notify("Data has been successfully uploaded", "success")
            formData.id = Math.random().toString(36).slice(2)
            await setDoc(doc(firestore, "Transactions", formData.id), formData);
            navigate("/accounts")
            setIsProcessing(false)
        }
        catch (err) {
            console.error(err)
            window.notify("Something went wrong, form data isn't uploaded.", "error")
        }
    }



    return (
        <>
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
                        <div className="row mt-5 text-center">
                            <div className="col-lg-6 md-12 sm-12 mb-5">
                                <BsBank />  <input type="number" className='input' placeholder='Branch Code (1 - 99)' name='branchCode' onChange={handleChange} />
                            </div>
                            <div className="col-lg-6 md-12 sm-12">
                                <FaUserAlt />   <input type="number" className='input' placeholder='Account Number (Length should be 9)' name='accountNo' onChange={handleChange} />
                            </div>
                        </div>



                        <div className="row mt-5 text-center">
                            <div className="col-lg-6 md-12 sm-12 mb-5">
                                <FaInfoCircle />  <select type="text" className='input' name='chooseAccount' onChange={handleChange} >
                                    <option selected>Choose Account Type...</option>
                                    <option value="Current">Current</option>
                                    <option value="Saving">Saving</option>
                                </select>
                            </div>



                            <div className="col-lg-6 md-12 sm-12">
                                <FaMoneyBillAlt />   <input type="number" className='input' placeholder='Initial Deposit (Minimum 500 Rs)' name='initialDeposit' onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col text-end me-5">
                                <button className='btn btn-success mb-4' disabled={isProcessing} >Submit</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}
