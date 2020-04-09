import {TRAER_TODOS} from '../types/usuariosTypes'
import axios from 'axios'

export const traerTodos = () => async(dispatch) => {
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users')
        dispatch({
            type: TRAER_TODOS,
            payload: respuesta.data
        })
    } catch (error) {
        console.log('error:' , error.message)
    }
}