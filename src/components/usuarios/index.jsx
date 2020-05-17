import React, { Component } from "react"
import Tabla from './Tabla'

import { connect } from 'react-redux'
import * as UsuariosActions from '../../actions/usuariosActions'
import Loader from '../general/Loader'
import Error from '../general/Error'

class Usuarios extends Component {

  componentDidMount() {
    if (!this.props.usuarios.length) {
      this.props.traerTodos()
    }
  }
  ponerContenido = () => {
    if (this.props.cargando) {
      return <Loader />
    }
    if (this.props.error) {
      return <Error mensaje={this.props.error} />
    }
    return <Tabla />
  }

  render() {
    return (
      <div>
        <h1>Test Netlify</h1>
        {this.ponerContenido()}
      </div>
    )
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer
}

export default connect(mapStateToProps, UsuariosActions)(Usuarios)