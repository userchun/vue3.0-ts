import React, { memo, Fragment } from 'react'
import Flop from '../GameModals/Flop'
import { areEqual } from '../../../utils'
function RenderTabPane(props: any) {
  const { radioInfo, gameOverInfoParams } = props
  const { moduleId } = gameOverInfoParams
  const modileIdStr = moduleId.toString()

  const render = () => {
    if (modileIdStr === '1006') return <Flop radioInfo={radioInfo} />
    else return <Fragment>还未开发</Fragment>
  }
  return render()
}

export default memo(RenderTabPane, areEqual)
