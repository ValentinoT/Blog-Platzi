import axios from 'axios'
import {TRAER_POR_USUARIO,CARGANDO,ERROR} from '../types/publicacionesTypes'

export const traerPorUsuario = (key) => async(dispatch,getState) =>{
    const {usuarios} = getState().usuariosReducer
    const {publicaciones} = getState().publicacionesReducer

    const usuarioID =  usuarios[key].id
    const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuarioID}`)

    const publicacionesActualizadas = [
        ...publicaciones,
        respuesta.data
    ]

    dispatch({
        type: TRAER_POR_USUARIO,
        payload: publicacionesActualizadas,
    })
} 