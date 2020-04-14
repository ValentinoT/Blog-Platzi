import {ACTUALIZAR,CARGANDO,ERROR,COMENTARIO_CARGANDO,COMENTARIO_ERROR,ACTUALIZAR_COMENTARIOS} from '../types/publicacionesTypes'
const INITIAL_STATE = {
    publicaciones: [],
    cargando: false,
    error: '',
    cargandoComentarios: false,
    cargandoError: false
}

export default (state = INITIAL_STATE , action) => {
    switch (action.type) {
        case ACTUALIZAR:
            return {...state , publicaciones: action.payload, cargando: false,error: ''}
        case CARGANDO:
            return {...state, cargando: true}
        case ERROR:
            return {...state, error: action.payload,cargando:false}
        case ACTUALIZAR_COMENTARIOS:
            return {...state , publicaciones: action.payload, cargandoComentarios: false,errorComentario: ''}
        case COMENTARIO_CARGANDO:
            return {...state, cargandoComentarios: true}
        case COMENTARIO_ERROR:
            return {...state, errorComentario: action.payload, cargandoComentarios:false}
        default:
            return state
    }
}