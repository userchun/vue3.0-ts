import React, { useState, memo } from 'react'
import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

function getBase64(img: any, callback: any) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const Avatar = (props: any) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImgUrl] = useState('')

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        setLoading(false)
        setImgUrl(imageUrl)
      })
    }
    const { getFilePath, content } = props
    const { code, data } = info.file.response
    if (code === 200) {
      getFilePath({
        content,
        filePath: data.filePath,
      })
    }
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <Upload
      name="file"
      listType="picture-card"
      accept="image/png, image/jpeg"
      className="avatar-uploader"
      showUploadList={false}
      headers={{
        version: 'v1',
        Authorization: localStorage.getItem('token') || '',
      }}
      action={`${process.env.REACT_APP_ENV}/?Action=uploadFile&fileType=3`}
      beforeUpload={beforeUpload}
      onChange={handleChange}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          style={{ width: '100%', overflow: 'hidden' }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  )
}

export default memo(Avatar)
