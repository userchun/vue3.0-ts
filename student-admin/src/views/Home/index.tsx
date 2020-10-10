import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
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
  // const { hisrory, location } = props
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
          <div className="logo"> 学员端后台管理 </div>
          <Menu
            theme="light"
            style={{ background: '#464c5b', color: '#FFFFFF' }}
            mode="inline"
            defaultSelectedKeys={['1']}>
            <Menu.Item
              style={{ ...meanItemStyle }}
              key="1"
              icon={<UserOutlined style={{ fontSize: 22 }} />}>
              nav 1
            </Menu.Item>
            <Menu.Item
              style={{ ...meanItemStyle }}
              key="2"
              icon={<VideoCameraOutlined style={{ fontSize: 22 }} />}>
              nav 2
            </Menu.Item>
            <Menu.Item
              style={{ ...meanItemStyle }}
              key="3"
              icon={<UploadOutlined style={{ fontSize: 22 }} />}>
              nav 3
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
            style={{ margin: 10, padding: 10 }}>
            Content
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Home
