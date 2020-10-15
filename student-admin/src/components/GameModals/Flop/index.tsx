import React, { Fragment, useState, useMemo, useContext, memo } from 'react'
import { Image, Radio, Input, Form, Button, message } from 'antd'
import './index.less'
import { Context } from '../../../views/NewModule/index'
import FlopUpload from '../FlopUpload'
import { addChoiceTypeGame } from '../../../api'
const { Group } = Radio
const { Item } = Form
const fileList: any[] = []
function Flop(props: any) {
  const { push, radioInfo, gameId } = props
  const { coverUrl } = radioInfo
  const contextValue: any = useContext(Context)
  const [value, setValue] = useState(3)
  const onChange = (e: any) => {
    setValue(e.target.value)
    contextValue.optionCount = e.target.value
    contextValue.option.length = 0
  }
  const getFilePath = (fileInfo: object) => {
    fileList.push(fileInfo)
  }
  const onFinish = async (e: object) => {
    contextValue.option.length = 0
    if (fileList.length < contextValue.optionCount + 1) {
      message.error('请完整上传')
    } else {
      const backgroundImage = fileList.find(
        (v: any) => v.content === 'backgroundImage',
      )
      contextValue.backgroundImage = backgroundImage.filePath
      fileList.forEach((v: any, i: number) => {
        const key: any = 'answer' + (i + 1)
        const obj = fileList.find((item: any) => item.content.includes(i))
        const optionItem = {
          content: obj && obj.filePath,
          answer: e[key],
        }
        obj && contextValue.option.push(optionItem)
      })
      try {
        const res: any = await addChoiceTypeGame({ ...contextValue })
        const { code, message } = res
        if (code === 200) {
          push()
        } else {
          message.error(message)
        }
      } catch (error) {}
    }
  }

  useMemo(() => {
    gameId && console.log(gameId, 'useMemo')
  }, [gameId])
  const renderFlopUploads = () => {
    const arrValue: number[] = []
    for (let i: number = 0; i < value; i++) {
      arrValue.push(i)
    }
    return (
      <Fragment>
        <Form onFinish={onFinish}>
          {arrValue.map((v) => {
            return (
              <div key={v} style={{ display: 'flex' }}>
                <div style={{ marginRight: 100, width: 200 }}>
                  <Item required label={'选项 ' + (v + 1)}>
                    <FlopUpload
                      content={'content' + v}
                      getFilePath={getFilePath}
                    />
                  </Item>
                </div>
                <div>
                  <Item
                    name={'answer' + (v + 1)}
                    rules={[
                      { required: true, message: '请输入答案!' },
                      { max: 20, message: '最多20字符' },
                    ]}>
                    <Input placeholder="输入答案" allowClear maxLength={21} />
                  </Item>
                </div>
              </div>
            )
          })}
          <div style={{ width: 400 }}>
            <Item required label="上传游戏背景图">
              <FlopUpload content="backgroundImage" getFilePath={getFilePath} />
            </Item>
          </div>
          <Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Item>
        </Form>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div className="coverUrl">
        <Image width="100%" height="100%" src={coverUrl} />
      </div>
      <div className="radio-tabs">
        <Group value={value} onChange={onChange}>
          <Radio value={3}>三个选项</Radio>
          <Radio value={4}>四个选项</Radio>
          <Radio value={5}>五个选项</Radio>
        </Group>
      </div>
      <div className="flop-upload">{renderFlopUploads()}</div>
    </Fragment>
  )
}

export default memo(Flop)
