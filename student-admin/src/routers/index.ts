import { lazy } from 'react'

import Root from '../views'
import Login from '../views/Login'

const Not = lazy(() => import('../views/Not'))
const Home = lazy(() => import('../views/Home'))
const NewModule= lazy(() => import('../views/NewModule'))

export interface IRouterProps {
  path: string //路径
  component: any //对应的组件
  requiresAuth?: boolean //页面是否需要登录才能看
  exact?: boolean //精准匹配
  authed?: number //权限等级
  routes?: IRouterProps[]
}

const routers: IRouterProps[] = [
  {
    path: '/',
    component: Root,
    routes: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/home',
        component: Home,
        routes:[
          {
            path: '/home',
            exact: true,
            component: NewModule,
          },
          {
            path: '/home/newmodule',
            component: NewModule,
            routes: [
            ],
            
          },
          {
            path: '*',
            component: Not,
            requiresAuth: false,
            authed: 0,
            routes: [],
          },
        ]
      },
      {
        path: '*',
        component: Not,
        requiresAuth: false,
        authed: 0,
        routes: [],
      },
    ],
  },
]

export default routers
