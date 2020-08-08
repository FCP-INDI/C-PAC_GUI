import React from 'react'
import MUITooltip from '@material-ui/core/Tooltip'

class Tooltip extends React.Component {
  render() {
    const { title } = this.props

    return (
      <MUITooltip title={title}>
        <span>
          { this.props.children }
        </span>
      </MUITooltip>
    )
  }
}

export default Tooltip
