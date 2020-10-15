import React, { memo } from 'react'
import { Select } from 'antd'
const { Option } = Select
const selectStyle = {
  width: 250,
  margin: '10px 20px',
}
const SelectComponent = (props: any) => {
  const { data, onChange } = props
  return (
    <Select
      placeholder={data.length ? data[0].value : ''}
      onChange={onChange}
      style={{ ...selectStyle }}>
      {data.map((v: any) => {
        return (
          <Option value={v.value} key={v.key}>
            {v.value}
          </Option>
        )
      })}
    </Select>
  )
}
export default memo(SelectComponent)
