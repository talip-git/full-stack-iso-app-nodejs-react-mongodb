const AuthReducer = (state,action)=>{
    switch(action.type){
        case "LOGIN_START":
            return({
                user:null,
                isFetching:true,
                error:false,
                standards:state.standards,
                standardId:state.standardId,
                clauseId:state.clauseId,
                subclauseId:state.subclauseId,
            })
        case "LOGIN_SUCCESS":
            return({
                user:action.payload,
                isFetching:false,
                error:false,
                standards:state.standards,
                standardId:state.standardId,
                clauseId:state.clauseId,
                subclauseId:state.subclauseId,
            })
        case "LOGIN_FAILURE":
            return({
                user:null,
                isFetching:false,
                error:action.error,
                standards:null,
                standardId:null,
                clauseId:null,
                subclauseId:null,                
            })
        case "LOGOUT":
            return({
                user:null,
                isFetching:false,
                error:false,
                standards:null,
                standardId:null,
                clauseId:null,
                subclauseId:null,
            })
        case "ADD_QUESTION":
            return({
                user:state.user,
                isFetching:false,
                error:false,
                standards:state.standards,
                standardId:action.standardId,
                clauseId:action.clauseId,
                subclauseId:action.subclauseId,
            })
        case "FETCH_STANDARDS_START":
            return({
                user:state.user,
                isFetching:true,
                error:false,
                standards:null,
                standardId:state.standardId,
                clauseId:null,
                subclauseId:null,
            })        
        case "FETCH_STANDARDS":
            return({
                user:state.user,
                isFetching:false,
                error:false,
                standards:action.payload,
                standardId:null,
                clauseId:null,
                subclauseId:null,
            })
        case "ADD_STANDARD":
            return({
                user:state.user,
                isFetching:false,
                error:false,
                standards:action.standards,
                standardId:action.standardId,
                clauseId:action.clauseId,
                subclauseId:action.subclauseId,
            })
        case "ADD_SUBCLAUSE":
            return({
                user:state.user,
                isFetching:false,
                error:false,
                standards:action.standards,
                standardId:action.standardId,
                clauseId:action.clauseId,
                subclauseId:action.subclauseId,
            })
        case "ADD_CLAUSE":
            return({
                user:state.user,
                isFetching:false,
                error:false,
                standards:action.standards,
                standardId:action.standardId,
                clauseId:action.clauseId,
                subclauseId:state.subclauseId,
            })
        case "UPDATE_USER":
            return({
                user:action.payload,
                isFetching:false,
                error:false,
                standards:action.payload,
                standardId:state.standardId,
                clauseId:state.clauseId,
                subclauseId:state.subclauseId,
            })
        default:
            return state
    }
}
export default AuthReducer