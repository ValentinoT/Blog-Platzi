import React,{Component} from 'react'
import {connect} from 'react-redux'
import * as tareasActions from '../../actions/tareasActions'
import Loader  from  '../general/Loader'
import Error from '../general/Error'
import {Redirect} from 'react-router-dom'

class Guardar extends Component {

    componentDidMount(){
        const{
            match:{params:{usu_id,tar_id}},
            tareas,
            cambioUsuarioId,
            cambioTitulo,
            limpiarForma
        } = this.props

        if(usu_id && tar_id){
            const tarea = tareas[usu_id][tar_id]
            cambioUsuarioId(tarea.userId)
            cambioTitulo(tarea.title)
        }
        else{
            limpiarForma()
        }
    }

    cambioUsuarioId = (event) => {
        this.props.cambioUsuarioId(event.target.value)
    }

    cambioTitulo = (event) => {
        this.props.cambioTitulo(event.target.value)
    }

    guardar = () => {
        const {
            match:{params:{usu_id,tar_id}},
            tareas,
            usuarioId,
            titulo,
            agregar,
            editar
        } = this.props

        const nuevaTarea = {
            userId: usuarioId,
            title: titulo,
            completed: false
        }

        if(usu_id && tar_id){
            const tarea = tareas[usu_id][tar_id]
            const tareaEditada= {
                ...nuevaTarea,
                completed: tarea.completed,
                id: tarea.id,
            }
            editar(tareaEditada)
        }else{
            agregar(nuevaTarea)
        }
    }
    deshabilitar = () => {
        const {usuarioId, titulo, cargando} = this.props;

        if(cargando){
            return true
        }
        if(!usuarioId || !titulo){
            return true
        }
        return false
    }

    mostrarAccion = () => {
        const {error,cargando} = this.props

        if(cargando){
            return <Loader />
        }
        if(error){
            return <Error mensaje={error}/>
        }
    }

    render(){
        return(
            <div>
                {
                    (this.props.regresar) ? <Redirect to='/tareas' /> : ''
                }
                <h1>Guardar Tarea</h1>
                usuario ID
                <input 
                    type="number"
                    value= {this.props.usuarioId}
                    onChange= {this.cambioUsuarioId}    
                />
                <br /><br/>
                Título
                <input 
                    type="text"
                    value={this.props.titulo}
                    onChange= {this.cambioTitulo} 
                />
                <br/><br/>
                <button
                    disabled= {this.deshabilitar()}
                    onClick= {this.guardar}
                >
                    Guardar
                </button>
                {this.mostrarAccion()}
            </div>
        )
    }
}

const mapStateToProps = ({tareasReducer}) => tareasReducer

export default connect(mapStateToProps,tareasActions)(Guardar)