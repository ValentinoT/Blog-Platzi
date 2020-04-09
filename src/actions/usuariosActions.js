export const traerTodos = () => (dispatch) => {
    dispatch({
        type: 'traerUsuarios',
        payload: [1,2,3]
    })
}