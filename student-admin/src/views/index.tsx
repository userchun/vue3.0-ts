import React, { memo, useEffect } from 'react'
import { renderRoutes } from 'react-router-config'
import { withRouter } from 'react-router-dom'

export default memo(
  withRouter(function Root(props: any) {
    const { history, location, route } = props
    if (location.pathname === '/') {
      history.push('/login')
    }
    useEffect(() => {}, [history, location.pathname])
    return <>{renderRoutes(route.routes)}</>
  }),
)
