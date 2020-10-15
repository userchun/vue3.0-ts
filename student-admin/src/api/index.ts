import { post,get } from './axios'

export const login = (p: object) => post('/?Action=token', p)
export const courseSeries = (p: object) => get('/?Action=courseSeries', p)
export const courseLevel = (p: object) => get('/?Action=courseLevel', p)
export const courseLesson = (p: object) => get('/?Action=courseLesson', p)
export const courseType = (p: object) => get('/?Action=courseType', p)
export const gameOverInfo = (p: object) => get('/?Action=gameOverInfo', p)
export const gameModuleList = (p: object) => get('/?Action=gameModuleList', p)
export const addChoiceTypeGame = (p: object) => post('/?Action=addChoiceTypeGame', p)
export const addGameModule = (p: object) => post('/?Action=addGameModule', p)
export const getGameInfo = (p: object) => get('/?Action=getGameInfo', p)