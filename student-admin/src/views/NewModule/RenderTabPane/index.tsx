import React, { memo, Fragment } from 'react'
import Flop from '../../../components/GameModals/Flop'
function RenderTabPane(props: any) {
  const { radioInfo, gameOverInfoParams, gameId } = props
  const { moduleId } = gameOverInfoParams
  const modileIdStr = moduleId.toString()
  const render = () => {
    if (modileIdStr === '1006')
      return <Flop gameId={gameId} radioInfo={radioInfo} />
    else return <Fragment>还未开发</Fragment>
  }
  return render()
}
function areEqual(prevProps, nextProps) {
  if (JSON.stringify(prevProps) === JSON.stringify(nextProps)) {
    return true
  } else {
    return false
  }
}
export default memo(RenderTabPane, areEqual)
