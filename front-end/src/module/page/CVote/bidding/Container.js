import { createContainer } from '@/util'
import Component from './Component'

const mapState = () => ({
})

const mapDispatch = () => {
  return {
    async updateBidding(param) {
    },
    async bid(param) {
    },
  }
}

export default createContainer(Component, mapState, mapDispatch)
