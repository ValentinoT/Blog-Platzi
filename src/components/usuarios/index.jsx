import React, { Component } from "react"

import {connect} from 'react-redux'
import * as UsuariosActions from '../../actions/usuariosActions'
import Loader from '../general/Loader'
import Error from '../general/Error'

class Usuarios extends Component{

  componentDidMount(){
    this.props.traerTodos()
  }
  ponerContenido = () => {
    if(this.props.cargando){
      return <Loader />
    }
    if(this.props.error){
      return <Error mensaje={this.props.error}/>
    }
    return(
      <table className='tabla'>
        <thead>
          <tr>
            <th>
              Nombre
            </th>
            <th>
              Correo
            </th>
            <th>
              Enlace
            </th>
          </tr>
        </thead>
        <tbody>
          {this.ponerFilas()}
        </tbody>
      </table>
    )
  }
  ponerFilas = () => (
    this.props.usuarios.map((usuario) => (
      <tr key= {usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
      </tr>
    ))
  )
  render(){
    return (
      <div>
        {this.ponerContenido()}
      </div>
    )
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer
}

export default connect(mapStateToProps, UsuariosActions)(Usuarios)