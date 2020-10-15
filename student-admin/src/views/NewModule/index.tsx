/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  useEffect,
  useState,
  Fragment,
  createContext,
  memo,
  useMemo,
} from 'react'
import { Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import {
  courseSeries,
  courseLevel,
  courseLesson,
  courseType,
  gameOverInfo,
} from '../../api'

import './index.less'
import SelectComponent from './SelectComponent'
import RenderTabPane from './RenderTabPane/index'
import ListModal from './ListModal'
import { setItemObj, getItemObj } from '../../utils'
const { TabPane } = Tabs
export const Context = createContext({})
const NewModule = (props: any) => {
  //四个下拉框
  const [courseSeriesList, setCourseSeriesList] = useState([])
  const [courseLevelList, setCourseLevel] = useState([])
  const [courseTypeList, setCourseType] = useState([])
  const [courseLessonList, setCourseLesson] = useState([])
  // 根据courseSeries 获取  courseLesson
  const [courseLessonParams, setCourseLessonParams] = useState({
    seriesId: 1000,
  })
  const [gameList, setGameLis] = useState([])

  //  添加游戏
  const [gameOverInfoParams, setGameOverInfoParams] = useState({
    courseSeries: '0',
    courseLevel: '0',
    courseLesson: '0',
    courseType: '0',
    gameName: '',
    moduleId: '1006',
    optionCount: 3,
    option: [],
    backgroundImage: '',
    sort: 1,
  })
  const [gameId, setGameId] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const [radioInfo, setRadioInfo] = useState({
    coverUrl: 'http://winabc.oss-cn-hangzhou.aliyuncs.com/website/default.jpg',
  })
  // radio选中模组信息

  const courseSeriesChange = (value: string, option: any) => {
    const { key } = option
    setCourseLessonParams({
      seriesId: key,
    })
    setGameOverInfoParams({
      ...gameOverInfoParams,
      courseSeries: key,
    })
  }
  const courseLessonChange = (value: string, option: any) => {
    const { key } = option
    setGameOverInfoParams({
      ...gameOverInfoParams,
      courseLesson: key,
    })
  }
  const courseLevelChange = (value: string, option: any) => {
    const { key } = option
    setGameOverInfoParams({
      ...gameOverInfoParams,
      courseLevel: key,
    })
  }
  const courseTypeChange = (value: string, option: any) => {
    const { key } = option
    setGameOverInfoParams({
      ...gameOverInfoParams,
      courseType: key,
    })
  }
  const addGameIcon = () => {
    setGameId(0)
    setModalVisible(true)
  }
  const modalHandleCancel = () => {
    setModalVisible(false)
  }
  const radioOnChange = (e: any) => {
    const { target } = e
    const { value } = target
    setItemObj('radioInfo', value)
  }
  const modalHandleOk = async () => {
    const radioInfoLocal = getItemObj('radioInfo')
    const { moduleId } = radioInfoLocal
    setRadioInfo(radioInfoLocal)
    setModalVisible(false)
    setGameOverInfoParams({
      ...gameOverInfoParams,
      moduleId,
    })
  }

  const onTabClick = (gameId) => {
    setGameId(gameId)
  }

  useEffect(() => {
    const initialization = async () => {
      try {
        const courseSeriesRes: any = await courseSeries({})
        const courseLevelRes: any = await courseLevel({})
        const courseTypeRes: any = await courseType({})
        setCourseSeriesList(courseSeriesRes.data)
        setCourseLevel(courseLevelRes.data)
        setCourseType(courseTypeRes.data)
        setGameOverInfoParams((gameOverInfoParams) => {
          return {
            ...gameOverInfoParams,
            courseSeries: courseSeriesRes.data[0].key,
            courseLevel: courseLevelRes.data[0].key,
            courseType: courseTypeRes.data[0].key,
          }
        })
      } catch (error) {}
    }
    initialization()
  }, [])

  useMemo(() => {
    const courseLessonFn = async () => {
      try {
        const courseLessonRes: any = await courseLesson(courseLessonParams)
        setCourseLesson(courseLessonRes.data)
        setGameOverInfoParams((gameOverInfoParams) => {
          return {
            ...gameOverInfoParams,
            courseLesson: courseLessonRes.data[0].key,
          }
        })
      } catch (error) {}
    }
    courseLessonFn()
  }, [courseLessonParams])
  useEffect(() => {
    const getGameOverInfoList = async () => {
      try {
        const gameOverInfoRes: any = await gameOverInfo(gameOverInfoParams)
        const { data, code } = gameOverInfoRes
        if (code === 200) {
          setGameLis(data)
          setGameId(data[0].gameId)
        }
      } catch (error) {}
    }
    getGameOverInfoList()
  }, [gameOverInfoParams])
  return (
    <Fragment>
      <Context.Provider value={gameOverInfoParams}>
        <div style={{ display: 'flex' }}>
          <SelectComponent
            data={courseSeriesList}
            onChange={courseSeriesChange}
          />
          <SelectComponent
            data={courseLessonList}
            onChange={courseLessonChange}
          />
          <SelectComponent
            data={courseLevelList}
            onChange={courseLevelChange}
          />
          <SelectComponent data={courseTypeList} onChange={courseTypeChange} />
        </div>
        <div className="games">
          <Tabs
            tabBarGutter={15}
            onTabClick={onTabClick}
            addIcon={
              <div className="item-tab">
                <PlusOutlined
                  style={{ fontSize: 30, width: 80 }}
                  onClick={addGameIcon}
                />
              </div>
            }
            size="large"
            type="editable-card">
            {gameList.map((item: any, i: number) => {
              return (
                <TabPane
                  key={item.gameId}
                  closeIcon={<div></div>}
                  className="add-game"
                  tab={<div className="item-tab">{i + 1}</div>}></TabPane>
              )
            })}
          </Tabs>
          <RenderTabPane
            radioInfo={radioInfo}
            gameId={gameId}
            gameOverInfoParams={gameOverInfoParams}
          />
        </div>
        <ListModal
          visible={modalVisible}
          handleOk={modalHandleOk}
          handleCancel={modalHandleCancel}
          onChange={radioOnChange}
        />
      </Context.Provider>
    </Fragment>
  )
}

export default memo(NewModule)
