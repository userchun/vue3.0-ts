import React, { Fragment } from 'react'
import './index.less'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import sha512 from 'js-sha512'
// import Loading from '../../components/loading'
const Login = (props: any) => {
  const { history } = props
  const onFinish = (values: any) => {
    let { username, password } = values
    username = username.toLowerCase()
    const timestamp = new Date().getTime()
    password = sha512(username + '&' + password + ':winabc')
    password = sha512(password + timestamp)
    const params = {
      timestamp,
      username,
      password,
    }
    console.log(params)
    history.push('/home')
  }

  return (
    <Fragment>
      <div className="login">
        <div className="left"></div>
        <div className="right">
          <div className="title"></div>
          <div className="form">
            <Form
              size="large"
              style={{
                width: 300,
                margin: '0 auto',
              }}
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}>
              <Form.Item
                name="username"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}>
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  // allowClear
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your Password!' },
                ]}>
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  // allowClear
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                {/* <a className="login-form-forgot" href="/">
                  Forgot password
                </a> */}
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Login
