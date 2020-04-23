import {TRAER_TODAS, CARGANDO,ERROR,CAMBIO_USUARIO_ID,CAMBIO_TITULO,GUARDAR,ACTUALIZAR} from '../types/tareasTypes'
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
            type: GUARDAR
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: ERROR,
            payload: 'Intente más tarde'
        })
    }
}

export const editar = (tareaEditada) => async(dispatch) =>{
    dispatch({
        type: CARGANDO,
    })

    try {
        const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tareaEditada.id}`,tareaEditada)
        console.log(respuesta.data)
        dispatch({
            type: GUARDAR
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: ERROR,
            payload: 'Intente más tarde'
        })
    }
}

export const cambioCheck = (usu_id,tar_id) => (dispatch,getState) => {
    const {tareas} = getState().tareasReducer
    const seleccionada = tareas[usu_id][tar_id]
     
    
    const actualizadas = {
        ...tareas
    }

    actualizadas[usu_id] = {
        ...tareas[usu_id]
    }
    console.log(tar_id)
    debugger
    actualizadas[usu_id][tar_id] = {
        ...tareas[usu_id][tar_id],
        completed: !seleccionada.completed
    }

    dispatch({
        type: ACTUALIZAR,
        payload:  actualizadas,
    })
}