/**
 * Actions.js
 * @des 路由封装,更多方法请自行获取navigation调用
 */


import { NavigationActions } from 'react-navigation'
import { InteractionManager } from 'react-native'


class Actions {
  constructor () {
    this.pop = this.pop.bind(this)
    this.navigate = this.navigate.bind(this)
    this.setNavigation = this.setNavigation.bind(this)
    this.getNavigation = this.getNavigation.bind(this)
  }

  setNavigation (navigation) {
    if (navigation) {
      this.navigation = navigation
    }
  }

  getNavigation () {
    return this.navigation
  }
  
  navigate(routeName, params) {
    this.navigation.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    )
  }

  pop (key) {
    this.navigation.goBack(key || null)
  }

}

export default new Actions()
