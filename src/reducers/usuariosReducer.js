const INITIAL_STATE = {
    usuarios: []
}


export default (state = INITIAL_STATE , action) => {
    switch (action.type) {
        case 'traerUsuarios':
            return {...state , usuarios: action.payload}
            break;
    
        default:
            return state
    }
}