import axios from 'axios'
import {TRAER_POR_USUARIO,CARGANDO,ERROR} from '../types/publicacionesTypes'
import * as usuariosTypes from '../types/usuariosTypes'

const {TRAER_TODOS : USUARIOS_TRAER_TODOS} = usuariosTypes

export const traerPorUsuario = (key) => async(dispatch,getState) =>{
    dispatch({
        type: CARGANDO,
    })
    const {usuarios} = getState().usuariosReducer
    const {publicaciones} = getState().publicacionesReducer
    const usuarioID =  usuarios[key].id

    try {
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuarioID}`)

        const publicacionesActualizadas = [
            ...publicaciones,
            respuesta.data
        ]
    
        const publicacionesKey = publicacionesActualizadas.length -1
        
        const usuariosActualizados = [...usuarios,]
    
        dispatch({
            type: TRAER_POR_USUARIO,
            payload: publicacionesActualizadas,
        })
            
        usuariosActualizados[key] = {
            ...usuarios[key],
            publicacionesKey
        }
    
        dispatch({
            type: USUARIOS_TRAER_TODOS,
            payload: usuariosActualizados,
        })
        
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: ERROR,
            payload: 'Publicaciones no disponibles'
        })
    }
    
} 