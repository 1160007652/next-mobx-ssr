import React from 'react'
import {initializeStore} from '../store'

const isServer = typeof window === 'undefined'
const __NEXT_MOBX_STORE__ = '__NEXT_MOBX_STORE__'

function getOrCreateStore(initialState) {
  // 如果是服务端渲染则创建新存储，否则客户端渲染共享状态
  if (isServer) {
    return initializeStore(initialState)
  }

  // 在windows对象上创建不可用的存储对象
  if (!window[__NEXT_MOBX_STORE__]) {
    window[__NEXT_MOBX_STORE__] = initializeStore(initialState)
  }
  return window[__NEXT_MOBX_STORE__]
}

export default (App) => {
  return class AppWithMobx extends React.Component {
    static async getInitialProps (appContext) {
      // 创建值为undefined的store 进行 initialState初始化
      // 允许设置自定义的store初始状态
      const mobxStore = getOrCreateStore()

      // 使用Provide向应用提供mobx-store
      appContext.ctx.mobxStore = mobxStore

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps.call(App, appContext)
      }

      return {
        ...appProps,
        initialMobxState: mobxStore
      }
    }

    constructor(props) {
      super(props)
      this.mobxStore = getOrCreateStore(props.initialMobxState)
    }

    render() {
      return <App {...this.props} mobxStore={this.mobxStore} />
    }
  }
}