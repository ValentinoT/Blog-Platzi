import React from 'react';
import {connect} from 'react-redux'
import * as UsuariosActions from '../../actions/usuariosActions'
import * as PublicacionesActions from '../../actions/publicacionesActions'
import Comentarios from './Comentarios'

import Loader from '../general/Loader'
import Error from '../general/Error'

const {traerTodos: usuariosTraerTodos} = UsuariosActions
const {
        traerPorUsuario: publicacionesPorUsuario, 
        abrirCerrar,
        traerComentarios,
    } = PublicacionesActions

class Publicacion extends React.Component{
    async componentDidMount(){

        const {
           usuariosTraerTodos,
           publicacionesPorUsuario,
           match:{params:{key}} 
        } = this.props

        if(!this.props.usuariosReducer.usuarios.length){
            await usuariosTraerTodos()
        }
        if(this.props.usuariosReducer.error){
            return 
        }
        if(!('publicacionesKey' in this.props.usuariosReducer.usuarios[key])){
            publicacionesPorUsuario(key)
        }
        
    }

    ponerUsuario = () => {
        const {
            usuariosReducer,
            match:{params:{key}},
        } = this.props
        if(usuariosReducer.error){
            return <Error mensaje={usuariosReducer.error}/>
        }
        if(!usuariosReducer.usuarios.length || usuariosReducer.cargando){
            return <Loader />   
        }
        const nombre = usuariosReducer.usuarios[key].name
        return <h1>Publicaciones de {nombre}</h1>
    }

    ponerPublicaciones = () => {
        const {
            usuariosReducer,
            usuariosReducer:{usuarios},
            publicacionesReducer,
            publicacionesReducer:{publicaciones},
            match:{params:{key}} 
        } = this.props

        if(!usuarios.length){return}
        if(usuariosReducer.error){return}
        if(publicacionesReducer.cargando){return(<Loader />)}
        if(publicacionesReducer.error){return(<Error mensaje={publicacionesReducer.error}/>)}
        if(!publicaciones.length){return}
        if(!('publicacionesKey' in usuarios[key])){return}

        const {
            publicacionesKey,
        } = usuarios[key]

        return this.mostrarInfo(publicaciones[publicacionesKey],publicacionesKey)
    }

    mostrarInfo = (publicaciones,publicacionesKey) => {
        return(
            publicaciones.map((publicacion,comentarioKey) => {
                return(
                    <div 
                        key={publicacion.id} 
                        className="publicacion"
                        onClick= {
                            () => {this.mostrarComentarios(publicacionesKey,comentarioKey,publicacion.comentarios)}
                        }
                    >
                        <h2>{publicacion.title}</h2>
                        <p>{publicacion.body}</p>
                        {publicacion.abierto? <Comentarios comentarios={publicacion.comentarios} /> : ''}
                    </div>
                )      
            })
        )
    }

    mostrarComentarios = (publicacionesKey,comentarioKey,comentarios) => {
        this.props.abrirCerrar(publicacionesKey,comentarioKey)
        if(!comentarios.length){
            this.props.traerComentarios(publicacionesKey,comentarioKey)
        }  
    } 

    render(){
        console.log(this.props)
        return(
            <div>
                {this.ponerUsuario()}
                {this.ponerPublicaciones()}
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
    abrirCerrar,
    traerComentarios,
}

export default connect(mapStateToProps,mapDispatchToProps)(Publicacion)