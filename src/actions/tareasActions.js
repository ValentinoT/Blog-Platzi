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