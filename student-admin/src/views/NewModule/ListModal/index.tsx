import React, { useState, useEffect, memo, Fragment } from 'react'
import { Modal, Row, Col, Image, Radio } from 'antd'
import { gameModuleList } from '../../../api'
function ListModal(props: any) {
  const { visible, handleOk, handleCancel, onChange } = props
  const [gameModuleListData, setGameModuleList] = useState([])
  useEffect(() => {
    try {
      const gameModuleListFn = async () => {
        const gameModuleListRes: any = await gameModuleList({
          pageIndex: 1,
          pageSize: 50,
        })
        setGameModuleList(gameModuleListRes.data.data)
      }
      gameModuleListFn()
    } catch (error) {}
  }, [])
  return (
    <Fragment>
      <Modal
        width="60%"
        title="选择模板"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Radio.Group onChange={onChange}>
          <Row gutter={[16, 16]}>
            {gameModuleListData.map((item: any) => {
              return (
                <Col key={item.moduleId} className="col">
                  <Image width={150} src={item.coverUrl} />
                  <div className="radio">
                    <Radio value={item} />
                  </div>
                </Col>
              )
            })}
          </Row>
        </Radio.Group>
      </Modal>
    </Fragment>
  )
}
function areEqual(prevProps, nextProps) {
  if (JSON.stringify(prevProps) === JSON.stringify(nextProps)) {
    return true
  } else {
    return false
  }
}

export default memo(ListModal, areEqual)
