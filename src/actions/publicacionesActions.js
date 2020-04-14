import axios from 'axios'
import {ACTUALIZAR,CARGANDO,ERROR,COMENTARIO_CARGANDO,COMENTARIO_ERROR,ACTUALIZAR_COMENTARIOS} from '../types/publicacionesTypes'
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

        const nuevas = respuesta.data.map((publicacion)=>({
            ...publicacion,
            comentarios: [],
            abierto: false,
        }))

        const publicacionesActualizadas = [
            ...publicaciones,
            nuevas
        ]
    
        const publicacionesKey = publicacionesActualizadas.length -1
        
        const usuariosActualizados = [...usuarios,]
    
        dispatch({
            type: ACTUALIZAR,
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

export const abrirCerrar = (publicacionKey,comentarioKey) => (dispatch,getState) => {
    const {publicaciones} = getState().publicacionesReducer
    const seleccionada = publicaciones[publicacionKey][comentarioKey]

    const actulizada = {
        ...seleccionada,
        abierto: !seleccionada.abierto
    }

    const publicaciones_Actualizadas = [...publicaciones]
    publicaciones_Actualizadas[publicacionKey] = [
        ...publicaciones[publicacionKey]
    ]
    publicaciones_Actualizadas[publicacionKey][comentarioKey] = actulizada

    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_Actualizadas,
    })
}

export const traerComentarios = (publicacionKey,comentarioKey) => async(dispatch,getState) => {
    const {publicaciones} = getState().publicacionesReducer
    const seleccionada = publicaciones[publicacionKey][comentarioKey]

    try {
        dispatch({
            type: COMENTARIO_CARGANDO,
        })
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/commentss?postId=${seleccionada.id}`)

        const actulizada = {
            ...seleccionada,
            comentarios: respuesta.data
        }
    
        const publicaciones_Actualizadas = [...publicaciones]
        publicaciones_Actualizadas[publicacionKey] = [
            ...publicaciones[publicacionKey]
        ]
        publicaciones_Actualizadas[publicacionKey][comentarioKey] = actulizada
    
        dispatch({
            type: ACTUALIZAR_COMENTARIOS,
            payload: publicaciones_Actualizadas,
        })
    } catch (error) {
        dispatch({
            type: COMENTARIO_ERROR,
            payload: 'Comentarios no disponibles',
        })
        console.log(error.message)
    }
}