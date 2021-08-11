import React, { useContext, useState,useEffect } from 'react'
import './body.css'
import Modal from '@material-ui/core/Modal';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'
function AdminForm({dispatch,standards,handleLogout}) {
    const [standardType,setStandardType] = useState('')
    const [number,setNumber] = useState('')
    const [desc,setDesc] = useState('')
    const [subnumber,setSubnumber] = useState('')
    const [subdesc,setSubdesc] = useState('')
    
    const handleSubmit = (event)=>{
        event.preventDefault()
        const addStandard = async ()=>{
            try {
                const res = await axios.post('standards/addStandard',{
                    standardType:standardType,
                    number:number,
                    desc:desc,
                    subnumber:subnumber,
                    subdesc:subdesc,
                })
                let _= standards.push(res.data)
                dispatch({type:"ADD_STANDARD",standards:_,standardId:res.data.standardId,clauseId:res.data.clauseId,subclauseId:res.data.subclauseId})
            } catch (error) {
                console.log(error)
            }
        }
        addStandard()
    }
    return (
        <React.Fragment>
            <button type = "button" className="btn-logout" onClick={handleLogout}>Logout</button>
            <form onSubmit = {handleSubmit} className="addForm" >
                <label htmlFor="standardType">Please Select a Standard: </label>
                <select name="standardType" id="select" className = "form-control"  value = {standardType} onChange = {e=>setStandardType(e.target.value)}>
                    <option value="">Please Select One!</option>
                    <option value="ISO27000">ISO 27000</option>
                    <option value="ISO9700">ISO 9700</option>
                </select>
                <label htmlFor="number">Clause Number: </label>
                <input type="text" name="number" id="number" className = "form-control"  value = {number} onChange = {e=>setNumber(e.target.value)}/>
                <label htmlFor="desc">Desc: </label>
                <input type="text" name="desc" id="desc"  className = "form-control" value = {desc} onChange = {e=>setDesc(e.target.value)}/>
                <label htmlFor="subnumber">Sub Clause Number: </label>
                <input type="text" name="subnumber" id="subnumber" className = "form-control"  value = {subnumber} onChange = {e=>setSubnumber(e.target.value)}/>
                <label htmlFor="subdesc">Sub Desc: </label>
                <input type="text" name="subdesc" id="subdesc"  className = "form-control" value = {subdesc} onChange = {e=>setSubdesc(e.target.value)}/>
                <input type="submit" className = "btn-admin" value = "Add New Standard" /> <br /> 
            </form>
        </React.Fragment>
    )
}
const StandardTable = ({standards,user,handleOpen,handleOpen2})=>{
    const {dispatch} = useContext(AuthContext)
    const dispatchSubclause = (standardId,clauseId,dispatch)=>{
        dispatch({type:"ADD_SUBCLAUSE",standardId:standardId,clauseId:clauseId})
        handleOpen()
    }
    const dispatchClause = (standardId,dispatch)=>{
        dispatch({type:"ADD_CLAUSE",standardId:standardId})
        handleOpen2()
    } 
    const standardTable = standards.map((standard)=>{
        const clauses = standard.clauses;
        return(
            <div key = {standard.standardType} className = "showPanel">
                <h3 className="heading">{standard.standardType}</h3>
                <div className = "heading">
                    <button type = "button" className ="btn-av mt-2 mb-4" onClick={()=>dispatchClause(standard._id,dispatch)}>Add Clauses</button>
                </div>
            {clauses.map((clause)=>{
                return(
                    <div key = {clause.number} className="clause-body">
                        <div className = "heading">
                            <h5>Clause: {clause.number}</h5>
                            <h6>
                                Description: {clause.desc}
                            </h6>
                            <button type = "button" className ="btn-av mt-2 mb-4" onClick={()=>dispatchSubclause(standard._id,clause._id,dispatch)}>Add Subclauses</button>
                        </div>
                        <table>
                            <tr>
                                <th>Subclause</th>
                                <th>Desc</th>
                            </tr>
                            {clause.subclauses.map((subclause)=>{
                                return(
                                    <tr>
                                        <td>{subclause.number}</td>
                                        <td>{subclause.desc}</td>
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
        <div className = "show-panel">
            {standardTable}
        </div>
    )
}
function AdminBody() {
    const [open,setOpen] = useState(false)
    const [open2,setOpen2] = useState(false)
    const [number,setNumber] = useState('')
    const [desc,setDesc] = useState('')
    const [subnumber,setSubnumber] = useState('')
    const [subdesc,setSubdesc] = useState('')
    const [initialStandards,setinitialStandards] = useState([])
    const {user,standards,standardId,clauseId,subclauseId,dispatch} = useContext(AuthContext)
    const handleLogout = ()=>{
        dispatch({type:"LOGOUT"})
    }
    useEffect(()=>{
        const fetchStandards = async ()=>{
            dispatch({type:"FETCH_STANDARDS_START"})
            try {
                const res= await axios.get('/standards/get/all')
                setinitialStandards(res.data)
                dispatch({type:"FETCH_STANDARDS",payload:res.data}) 
            } catch (error) {
                console.log(error)
            }
        }
        fetchStandards()
    },[]) 
    const handleClause = (event)=>{
        event.preventDefault()
        const addClause = async(dispatch)=>{
            try {
                const res = await axios.put(`standards/updateStandard/addClause/${standardId}`,{
                    standardId:standardId,
                    number:number,
                    desc:desc
                })
                dispatch({type:"ADD_CLAUSE",standards:standards,standardId:standardId,clauseId:clauseId})
            } catch (error) {
                console.log(error)
            }
        }
        addClause(dispatch)
        handleClose2()
        window.location.reload()
    }
    const handleSubclause = (event)=>{
        event.preventDefault()
        const addSubclause = async(dispatch)=>{
            try {
                const res = await axios.put(`standards/updateStandard/addSubclause/${standardId}`,{
                    standardId:standardId,
                    clauseId:clauseId,
                    subnumber:subnumber,
                    subdesc:subdesc,
                })
                dispatch({type:"ADD_SUBCLAUSE",standards:standards,standardId:standardId,clauseId:clauseId,subclauseId:subclauseId})
            } catch (error) {
                console.log(error)
            }
        }
        addSubclause()
        handleClose()
        window.location.reload()
    }
    const handleOpen=()=>{
        setOpen(true)
    }
    const handleOpen2 = ()=>{
        setOpen2(true)
    }
    const handleClose = ()=>{
        setOpen(false)
    }
    const handleClose2 = ()=>{
        setOpen2(false)
    }
    return (
        <div className = "body">
            <div className = "standard-table">
                <StandardTable standards = {initialStandards} handleOpen={handleOpen} handleOpen2={handleOpen2}/>
            </div>
            <div className = "addPanel">
                <AdminForm dispatch={dispatch} standards = {standards} handleLogout={handleLogout}/>
            </div>
            <Modal
                open={open2}
                onClose={handleClose2}
                >
                <form onSubmit={handleClause} className="modal-form">
                    <label htmlFor="number" className = "form-label">Clause: </label><br />
                    <input type="text" name = "number" value = {number} onChange = {e=>setNumber(e.target.value)} className="form-control"/> <br />  
                    <label htmlFor="desc" className = "form-label">Clause Description: </label><br />
                    <textarea name="desc" id="" cols="10" rows="5" value = {desc} onChange = {e=>setDesc(e.target.value)} className = "form-control"></textarea><br />
                    <input type="submit" name = "submit" value = "Add" className = "btn-add"/>
                </form>
            </Modal>
            <Modal
                open={open}
                onClose={handleClose}
                >
                <form onSubmit = {handleSubclause} className = "modal-form">
                    <label htmlFor="subnumber" className = "form-label">Sub Clause: </label><br />
                    <input type="text" name = "subnumber" value = {subnumber} onChange = {e=>setSubnumber(e.target.value)} className="form-control"/> <br />
                    <label htmlFor="subdesc">Sub Description: </label> <br />
                    <textarea name="subdesc" id="" cols="10" rows="5" value = {subdesc} onChange = {e=>setSubdesc(e.target.value)} className = "form-control"></textarea><br />
                    <input type="submit" name = "submit" value = "Add" className = "btn-add"/>
                </form>
            </Modal>
        </div>
    )
}

export default AdminBody
