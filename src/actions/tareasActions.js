import {TRAER_TODAS, CARGANDO,ERROR,CAMBIO_USUARIO_ID,CAMBIO_TITULO,AGREGADA} from '../types/tareasTypes'
import axios from 'axios'

export const traerTodas = () => async(dispatch) => {
    dispatch({
        type: CARGANDO,
    })
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos')

        const tareas = {}

        respuesta.data.map((tar) => (
            tareas[tar.userId] = {
                ...tareas[tar.userId],
                [tar.id] : {
                    ...tar
                }
            }
        ))

        dispatch({
            type: TRAER_TODAS,
            payload: tareas
        })
    }catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Información de tareas no disponible',
        })
    }
}

export const cambioUsuarioId = (usuarioId) => (dispatch) => {
    dispatch({
        type: CAMBIO_USUARIO_ID,
        payload: usuarioId,
    })
}

export const cambioTitulo = (titulo) => (dispatch) => {
    dispatch({
        type: CAMBIO_TITULO,
        payload: titulo,
    })
}

export const agregar = (nuevaTarea) => async (dispatch) => {
    dispatch({
        type: CARGANDO,
    })

    try {
        const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos',nuevaTarea)
        console.log(respuesta.data)
        dispatch({
            type: AGREGADA
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: ERROR,
            payload: 'Intente más tarde'
        })
    }
}