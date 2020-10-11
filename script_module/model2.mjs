/*
 * @Name: 
 * @Description: 
 * @Author: 刘燕保
 * @Date: 2020-10-10 19:26:54
 */
import { subfun } from './submodule.mjs'

export const modelTemp = 239

export const modelCon = () => {
    console.log('调用module2方法')
    subfun()
}
