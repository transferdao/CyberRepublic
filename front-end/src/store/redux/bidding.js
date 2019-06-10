import BaseRedux from '@/model/BaseRedux'

class BiddingRedux extends BaseRedux {
  defineTypes() {
    return ['bidding']
  }

  defineDefaultState() {
    return {
      active_bidding: null,

      loading: false,

      all_biddings: [],
      all_biddings_total: 0,
    }
  }
}

export default new BiddingRedux()
