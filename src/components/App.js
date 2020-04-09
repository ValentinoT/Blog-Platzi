import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Usuarios from './usuarios/index'
import Menu from './Menu'

const Tareas = () => <div>Tareas</div>

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className='margen'>
      <Route exact path='/' component={Usuarios}/>
      <Route exact path='/tareas' component={Tareas}/>
    </div>
  </BrowserRouter>
)

export default  App