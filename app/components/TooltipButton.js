import React from 'react'
import MUITooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'

class TooltipButton extends React.Component {
  render() {
    const { title, spanProps, ...props } = this.props

    return (
      <MUITooltip title={title}>
        <span {...spanProps}>
          <Button {...props}>
            { this.props.children }
          </Button>
        </span>
      </MUITooltip>
    )
  }
}

export default Tooltip
