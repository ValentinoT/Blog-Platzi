import React from 'react';
import {connect} from 'react-redux'
import * as UsuariosActions from '../../actions/usuariosActions'
import * as PublicacionesActions from '../../actions/publicacionesActions'

const {traerTodos: usuariosTraerTodos} = UsuariosActions
const {traerPorUsuario: publicacionesPorUsuario} = PublicacionesActions

class Publicacion extends React.Component{
    async componentDidMount(){
        if(!this.props.usuariosReducer.usuarios.length){
            await this.props.usuariosTraerTodos()
        }
        this.props.publicacionesPorUsuario(this.props.match.params.key)
    }
    render(){
        console.log(this.props)
        return(
            <div>
                <h1>Publicaciones de</h1>
                <p>{this.props.match.params.key}</p>
            </div>
        )
    }
}

const mapStateToProps= ({usuariosReducer, publicacionesReducer}) => {
    return{
        usuariosReducer,
        publicacionesReducer
    }
}

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesPorUsuario,
}

export default connect(mapStateToProps,mapDispatchToProps)(Publicacion)