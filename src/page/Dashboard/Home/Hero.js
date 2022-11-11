import React from 'react'
import { GoPerson } from 'react-icons/go'
import { FaMoneyBillAlt } from 'react-icons/fa'


export default function Hero() {
  return (
    <>
      <div className="container">
        <div className="row mt-4 justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">

            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title"> <GoPerson /> Accounts</h5>
                <hr />
                <a href="/accountdata" className="btn btn-primary me-3" >Add New Account</a>
                <a href="/accounts" className="btn btn-danger">View All Accounts</a>
                <hr />
                <h3 className="card-title mt-5">Accounts</h3>
              </div>


            </div>

          </div>
          <div className="col-12 col-md-6 col-lg-5">

            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title"> <FaMoneyBillAlt /> Transactions</h5>
                <hr />
                <a href="/transaction" className="btn btn-primary me-3" >View All Transactions</a>
                <hr />
                <h3 className="card-title mt-5">Transactions</h3>

              </div>


            </div>

          </div>
        </div>
      </div>
    </>
  )
}
