import React, { Component } from 'react'
import { tareaService } from '../../services/tareaService'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TareaRow from './tareaRow/tareaRow'
import PropTypes from 'prop-types'

export class TareasComponent extends Component {

  constructor(props) {
    super(props)
    this.state = { tareas: [] }
  }

  async componentDidMount() {
    //debugger //  to show lifecycle
    await this.actualizarTareas()
  }

  actualizarTareas = async () => {
    try {
      const tareas = await tareaService.allInstances()
      this.setState({
        tareas: tareas
      })
    } catch (error) {
      this.errorHandler(error)
    }
  }


  errorHandler(errorMessage) {
    throw errorMessage
  }
  render() {

    return (
      <Paper>
        <br />
        <h1>Tareas a realizar</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tarea</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Asignatario</TableCell>
              <TableCell>% Cumplimiento</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody id="resultados">
            {
              this.state.tareas.map((tarea) =>
                <TareaRow
                  tarea={tarea}
                  key={tarea.id}
                  data-testid={`tarea_${tarea.id}`}
                  actualizar={this.actualizarTareas} />)
            }
          </TableBody>
        </Table>
      </Paper>
    )
  }

  static get propTypes() {
    return {
      history: PropTypes.object
    }
  }
}


export default TareasComponent