import {TRAER_TODAS, CARGANDO,ERROR} from '../types/tareasTypes'
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
        type: 'cambio_usuario_id',
        payload: usuarioId,
    })
}

export const cambioTitulo = (titulo) => (dispatch) => {
    dispatch({
        type: 'cambio_titulo',
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
            type: 'agregada'
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: Error,
            payload: 'Intente más tarde'
        })
    }
}