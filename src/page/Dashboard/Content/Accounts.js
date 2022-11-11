import React, { useEffect, useState } from 'react'
import { GoPerson } from 'react-icons/go'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { ImArrowLeft } from 'react-icons/im'
import { BiPlusMedical } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { firestore } from '../../../config/firebase';
import { getDocs, collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FaUserAlt, FaInfoCircle, FaMoneyBillAlt } from "react-icons/fa"
import { async } from '@firebase/util';


export default function Accounts() {

  const valuesToSet = {

    name: "",
    chooseAccount: "",
    initialDeposit: ""

  }

  const docsCollectionRef = collection(firestore, "Account")
  const [document, setDocument] = useState([])
  const [state, setState] = useState(valuesToSet)
  const [modalItem, setModalItem] = useState({})
  const [processingForLoader, setProcessing] = useState(false)



  const readRoster = async () => {

    setProcessing(true)

    const docsCollectionRef = collection(firestore, "Account")
    let array = []
    const querySnapshot = await getDocs(docsCollectionRef);
    querySnapshot.forEach((doc) => {
      console.log(doc)
      array.push({ ...doc.data(), id: doc.id })
      setDocument(array);
      setProcessing(false)
    })
  }

  useEffect(() => {
    readRoster();
  }, [])

  const handleDelete = async (item) => {
    await deleteDoc(doc(firestore, "Account", item.id));
    let newArray = document.filter((docs) => {
      return item.id !== docs.id;
    })
    setDocument(newArray)
  }


  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let { name, chooseAccount } = state
    console.log(state);
    try {
      await setDoc(doc(firestore, "Account", state.id), state, { merge: true });
      window.notify("Data has been successfully uploaded", "success")
      state.id = Math.random().toString(36).slice(2);
      await setDoc(doc(firestore, "Transactions", state.id), state);
    }
    catch (err) {
      console.error(err)
      window.notify("Something went wrong, form data isn't uploaded.", "error")
    }

    name = name.trim()
    chooseAccount = chooseAccount.trim()
  }

  const handleUpdate = (item) => {
    setState(item)
  }
  const handleWithdraw = async () => {

    if (modalItem.initialDeposit < state.initialDeposit) {
      return window.notify("Invalid Amount (:", "Warning")
    }

    else if (state.initialDeposit < 0) {
      return window.notify("Invalid Amount (:", "Warning")
    }

    let remainingAmount = Number(modalItem.initialDeposit) - Number(state.initialDeposit)

    modalItem.initialDeposit = remainingAmount;
    // console.log(modalItem.initialDeposit);
    await setDoc(doc(firestore, "Account", modalItem.id), modalItem);
    // console.log("Updated");
    setState(valuesToSet)
    readRoster()
  }

  const handleDeposit = async () => {

    // if (modalItem.initialDeposit < state.initialDeposit) {
    //   return window.notify("Invalid Amount (:", "Warning")
    // }

    if (state.initialDeposit < 500) {
      return window.notify("Invalid Amount (:", "Warning")
    }

    let remainingAmount = parseInt(modalItem.initialDeposit) + parseInt(state.initialDeposit)
    console.log(remainingAmount);

    modalItem.initialDeposit = remainingAmount;
    console.log(modalItem.initialDeposit);
    await setDoc(doc(firestore, "Account", modalItem.id), modalItem);
    // console.log("Updated");
    setState(valuesToSet)
    readRoster()
  }
  return (

    <div className="container">
      <div className="row mt-4 justify-content-center">
        <div className="col-12 col-md-10 col-lg-10">

          <div className="card">
            <div className="card-body text-center">

              <Link to="/" className="btn btn-danger  float-start" ><ImArrowLeft /> Back To Dashboard </Link>
              <Link to="/accountdata" className="btn btn-danger float-end"> <BiPlusMedical /> Create New Account </Link>
              <br />
              <br />

              <h3 className="card-title"><GoPerson /> Accounts</h3>
              <br />
              <div className="table-responsive">


                {!processingForLoader

                  ? <Table className="table table-bordered">
                    <Thead>
                      <Tr className='p-3 bg-primary text-white'>
                        <Th >Brach Code</Th>
                        <Th >Account #</Th>
                        <Th>Name</Th>
                        <Th>Registered ID</Th>
                        <Th>Type</Th>
                        <Th>Balance</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        document.map((item) => {
                          return (
                            <Tr>
                              <Td>{item.branchCode}</Td>
                              <Td>{item.accountNo}</Td>
                              <Td>{item.name}</Td>
                              <Td>{item.id}</Td>
                              <Td>{item.chooseAccount}</Td>
                              <Td onClick={() => { setModalItem(item); }} type="button" className="btn btn-primary bg-primary my-2" style={{ width: "90%" }} data-bs-toggle="modal" data-bs-target="#exampleModal1" >{item.initialDeposit}</Td>
                              <Td>
                                <button className='btn btn-success me-2' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleUpdate(item)}>Update</button>
                                <button className='btn btn-danger' onClick={() => handleDelete(item)}>Delete</button>
                              </Td>
                            </Tr>
                          )
                        })
                      }


                    </Tbody>
                  </Table>

                  : <div className='text-center'><div className='spinner-grow'></div></div>
                }
              </div>

            </div>


          </div>
        </div>
      </div>
      <>
        {/* Modal 1 */}
        <div
          className="modal fade"
          id="exampleModal1"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {modalItem.id}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {/* <form onSubmit={handleSubmit}> */}
                <div className="row text-center">
                  <div className="col mb-3">
                    <input type="number" className='input form-control' value={state.initialDeposit} placeholder='Insert Amount' name='initialDeposit' onChange={handleChange} />
                  </div>
                </div>

                <div className="modal-footer mt-1">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleWithdraw}
                  >
                    Withdraw
                  </button>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDeposit}>
                    Deposit
                  </button>
                </div>
                {/* </form> */}
              </div>

            </div>
          </div>
        </div>



        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row mt-5 text-center">
                    <div className="col-lg-6 md-12 sm-12 mb-5">
                      <FaUserAlt /> <input type="text" className='input' placeholder='Full Name' name='name' value={state.name} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="row mt-5 text-center">
                    <div className="col-lg-6 md-12 sm-12 mb-5">
                      <FaInfoCircle />  <select type="text" className='input' name='chooseAccount' value={state.chooseAccount} onChange={handleChange} >
                        <option value="Current">Current</option>
                        <option value="Saving">Saving</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </>

    </div>


  )
}
