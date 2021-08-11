import React, { useContext, useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal';
import './home.css'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';

const FormModal = ({open,setOpen,handleClose,question,setQuestion,reference,setReference})=>{
    const {user,standardId,clauseId,subclauseId,dispatch} = useContext(AuthContext)
    const clearBody = ()=>{
        setQuestion('')
        setReference('')
    }
    const handleSubmit = (event)=>{
        event.preventDefault()
        let body = {
            userId:user._id,
            standardId:standardId,
            clauseId:clauseId,
            subclauseId:subclauseId,
            question:question,
            reference:reference,
        }
        const addQuestion = async ()=>{
            try {
                const res = await axios.put(`users/${user._id}/addQuestion`,body)
                dispatch({type:"UPDATE_USER",payload:res.data})
            } catch (error) {
                console.log(error)
            }       
        }
        setOpen(false)
        addQuestion()
        clearBody()
    }
    return(
        <Modal
            open={open}
            onClose={handleClose}
        >
            <form onSubmit = {handleSubmit} className = "modal-form">  
                <label htmlFor="question" className = "form-label">Question: </label><br />
                <input type="text" name = "question" value = {question} onChange = {e=>setQuestion(e.target.value)} className="form-control"/> <br />
                <label htmlFor="reference" className = "form-label">Reference: </label><br />
                <input type="text" name = "reference" value = {reference} onChange = {e =>setReference(e.target.value)} className="form-control"/> <br />
                <input type="submit" name = "submit" value = "Add" className = "btn-add"/>
            </form>
        </Modal>
    )
}
const StandardTable = ({standards,setOpen,user})=>{
    const {dispatch} = useContext(AuthContext)
    const handleOpen = (standardId,clauseId,subclauseId)=>{
        dispatch({type:"ADD_QUESTION",standardId:standardId,clauseId:clauseId,subclauseId:subclauseId})
        setOpen(true)
    }
    const handleDelete = async (standardId,clauseId,subclauseId,question,reference)=>{
        console.log("subclause: "+subclauseId)
        console.log("question: "+question)
        console.log("reference: "+reference)
        try {
            const res = await axios.put(`users/${user._id}/deleteQuestion`,{
                standardId:standardId,
                clauseId:clauseId,
                subclauseId:subclauseId,
            })
            dispatch({type:"UPDATE_USER",payload:res.data})
        } catch (error) {
            console.log(error)
        }
    } 
    const userQuestions = (user,standardId,clauseId,subclauseId) =>{
        const qandref = user.qandrefs.filter((qandref)=>{
            return qandref.standardId === standardId && qandref.clauseId === clauseId && qandref.subclauseId === subclauseId
        })[0]
        if(!qandref){
            return(
                <React.Fragment>
                    <td><button type = "button" className = "btn-add" onClick={()=>handleOpen(standardId,clauseId,subclauseId)}>Add Question</button></td>
                    <td></td>
                </React.Fragment>
            )
        }
        else{
            return(
                <React.Fragment>
                    <td>{qandref.question}</td>
                    <td>{qandref.reference}</td>
                    <td><button type ="button" className = "btn-add" onClick = {()=>handleDelete(standardId,clauseId,subclauseId,qandref.question,qandref.reference)}>Delete Question</button></td>
                </React.Fragment>
            )
        }
    }
    const standardTable = standards.map((standard)=>{
        const clauses = standard.clauses;
        return(
            <div key = {standard.standardType}>
            <h3 className="heading">{standard.standardType}</h3>
            {clauses.map((clause)=>{
                return(
                    <div key = {clause.number} className ="clause-table">
                        <div className = "heading">
                            <h5>Clause: {clause.number}</h5>
                            <h6>
                                Description: {clause.desc}
                            </h6>
                        </div>
                        <table className = "body-table">
                            <tr>
                                <th>Subclause</th>
                                <th>Desc</th>
                                <th>Questions</th>
                                <th>References</th>
                            </tr>
                            {clause.subclauses.map((subclause)=>{
                                return(
                                    <tr>
                                        <td>{subclause.number}</td>
                                        <td>{subclause.desc}</td>
                                        {userQuestions(user,standard._id,clause._id,subclause._id)}
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                )            
            })}
        </div>
        )
    })

    return(
        <div className = "body-body">
            {standardTable}
        </div>
    )
}
function HomeBody() {
    const [open,setOpen] = useState(false);
    const [standards,setStandards] = useState([])
    const [question,setQuestion] = useState('');
    const [reference,setReference] = useState('');
    const {user,dispatch,standardId} = useContext(AuthContext)
    useEffect(()=>{
        const fetchStandards = async (dispatch)=>{
            try {
                const res= await axios.get('/standards/get/all')
                setStandards(res.data)
                dispatch({type:"FETCH_STANDARDS",payload:res.data})  
            } catch (error) {
                console.log(error)
            }
        }
        fetchStandards(dispatch)
    },[user])
    const handleLogout = ()=>{
        dispatch({type:"LOGOUT"})
    }
    const handleClose = ()=>{
        setOpen(false)
    }
    return (
        <div className = "test">
            <div className = "body-heading">
                <h3>Avaliable Standards</h3>
                <button type = "button" className = "btn-logout" onClick={handleLogout}>Logout</button>
            </div>
            <StandardTable 
                standards = {standards}
                user = {user}
                setOpen = {setOpen}/>
            <FormModal 
                open = {open}
                handleClose={handleClose}
                setOpen={setOpen}
                question={question}
                setQuestion={setQuestion}
                reference={reference}
                setReference={setReference}
                />
        </div>
    )
}

export default HomeBody
