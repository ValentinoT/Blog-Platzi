import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Usuarios from './usuarios/index'
import Menu from './Menu'
import Publicaion from './publicaciones/Publicacion'
import Tareas from '../components/tareas/Tareas'

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className='margen'>
      <Route exact path='/' component={Usuarios}/>
      <Route exact path='/tareas' component={Tareas}/>
      <Route exact path='/publicaciones/:key' component={Publicaion}/>
    </div>
  </BrowserRouter>
)

export default  App