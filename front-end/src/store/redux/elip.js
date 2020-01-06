import BaseRedux from '@/model/BaseRedux'

class ElipRedux extends BaseRedux {
  defineTypes() {
    return ['elip']
  }

  defineDefaultState() {
    return {
      loading: false,
      data: undefined,
      detail: {},
      reviews: [],
      filters: {},
    }
  }
}

export default new ElipRedux()
