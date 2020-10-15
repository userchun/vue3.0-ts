import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {Link} from  'react-router-dom'
import { renderRoutes } from 'react-router-config'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import './index.less'

const { Header, Sider, Content } = Layout
const meanItemStyle = {
  height: 50,
  paddingTop: 5,
  fontSize: 22,
}
const Home = (props: any) => {
  const { route,location } = props
  const [collapsed, setCollapsed] = useState(false)
 
  const toggle = () => {
    setCollapsed(!collapsed)
  }
  return (
    <div className="home">
      <Layout style={{ width: '100%', height: '100%' }}>
        <Sider
          trigger={null}
          width="260"
          collapsible
          style={{ background: '#464c5b' }}
          theme="light"
          collapsed={collapsed}>
          <div className="logo"> </div>
          <Menu
            theme="light"
            style={{ background: '#464c5b', color: '#FFFFFF' }}
            mode="inline"
            defaultSelectedKeys={location.pathname === '/home'
            ? '/home/newmodule'
            : location.pathname}>
            <Menu.Item
              style={{ ...meanItemStyle }}
              key="/home/newmodule"
              icon={<PlusOutlined style={{ fontSize: 22 }} />}>
             <Link
                  to="/home/newmodule"
                  style={{ paddingTop: 0 }}>
                    新增模块
                </Link>
            </Menu.Item>
            <Menu.Item
              style={{ ...meanItemStyle }}
              key="/home/setting"
              icon={<UploadOutlined style={{ fontSize: 22 }} />}>
            <Link
              to="/home/setting"
              style={{ paddingTop: 0 }}>
                新增模块
            </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              { className: 'trigger', onClick: toggle },
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: 15,
              padding: 15,
            }}>
            {renderRoutes(route.routes)}
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Home
