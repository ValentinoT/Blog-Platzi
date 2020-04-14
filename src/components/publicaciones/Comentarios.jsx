import React from 'react'
import Loader from '../general/Loader'
import Error from '../general/Error'
import {connect} from 'react-redux'

const Comentarios = (props) => {

    if(props.errorComentario){
        return <Error mensaje={props.errorComentario} />
    }
    if(props.cargandoComentarios && !props.comentarios.length){
        return <Loader />
    }
    

    const ponerComentarios = () => (
        props.comentarios.map((comentario)=>(
            <li>
                <b>
                    <u>
                        {comentario.email}
                    </u>
                </b>
                <br/>
                {comentario.body}
            </li>
        ))
    )

    return(
        <ul>
            {ponerComentarios()}
        </ul>
    )
}
const mapStateToProps = ({publicacionesReducer}) => publicacionesReducer

export default connect(mapStateToProps)(Comentarios)