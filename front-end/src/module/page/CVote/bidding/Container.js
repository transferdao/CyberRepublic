import { createContainer } from '@/util'
import Component from './Component'
import BiddingService from '@/service/BiddingService'

const mapState = () => ({
})

const mapDispatch = () => {
  const service = new BiddingService()
  return {
    async bid(param) {
      // param: id, files, proposalId
      return service.bid(param)
    },
    async listSelf(param) {
      return service.listSelf(param)
    },
  }
}

export default createContainer(Component, mapState, mapDispatch)
