import React, { useEffect, useState } from 'react'
import { Table, Tbody, Thead, Tr, Th, Td } from 'react-super-responsive-table'
import { ImArrowLeft } from 'react-icons/im'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite'
import { firestore } from '../../../config/firebase'


export default function Transaction() {
    const [processing, setProcessing] = useState(false)
    const [documents, setDocuments] = useState([])
    const [modalData, setModalData] = useState({})
    const [price, setPrice] = useState("")


    const readRoster = async () => {
        setProcessing(true)
        const docsCollectionRef = collection(firestore, "Transactions")
        let array = []
        const querySnapshot = await getDocs(docsCollectionRef);
        querySnapshot.forEach((doc) => {
            array.push(doc.data())
            setDocuments(array);
        })
        setProcessing(false)
    }

    useEffect(() => {
        readRoster();
    }, []);

    
    return (

    <div className="container">
        <div className="row mt-4 justify-content-center">
            <div className="col-12 col-md-10 col-lg-10">
                <div className="card " style={{ overflow: "hidden" }}>
                    <div className="card-body text-center">
                        <Link to='/' className='btn btn-danger text-white float-start'> <ImArrowLeft /> Back To Dashboard</Link>

                        <h3 className='card-title my-4'> <FaMoneyBillAlt /> Transaction</h3>

                        <div className="table-responsive">
                            {!processing ?

<Table className='table table-bordered'>
                                    <Thead>
                                        <Tr className='bg-primary text-white'>
                                            <Th>Account #</Th>
                                            <Th>Time</Th>
                                            <Th>Type</Th>
                                            <Th>Amount</Th>
                                            <Th>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {documents.map((Tdata) => {
                                            return (
                                                
                                                <Tr>

                                                    <Td>{Tdata.accountNo}</Td>
                                                    <Td>{window.getTime(Tdata.dataCreated)}</Td>
                                                    <Td>{Tdata.chooseAccount}</Td>
                                                    <Td>{Tdata.initialDeposit}</Td>
                                                    <Td> <button onClick={() => { setModalData(Tdata) }} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        Details
                                                    </button></Td>
                                                </Tr>
                                            )
                                        })}
                                    </Tbody>
                                </Table>
                                : <div className='text-center'><div className='spinner-grow'></div></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Account Details</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div className="row">
                            <div className="col-6">ID:</div>
                            <div className="col-6"> {modalData.accountNo} </div>

                            <div className="col-6">Name: </div>
                            <div className="col-6"> {modalData.name}</div>

                            <div className="col-6">Account:</div>
                            <div className="col-6"> {modalData.chooseAccount} </div>


                            <div className="col-6"> Amount:</div>
                            <div className="col-6"> {modalData.initialDeposit}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

}