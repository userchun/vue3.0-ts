import { post } from './axios'

export const login = (p: object) => post('/?Action=token', p)
