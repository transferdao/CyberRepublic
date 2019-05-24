import { BIDDING_STATUS } from '@/constant'

// proposal bidding
export default {
  status: {
    [BIDDING_STATUS.NOT_NEEDED]: '不需要招标',
    [BIDDING_STATUS.UNSTARTED]: '未开始',
    [BIDDING_STATUS.STARTED]: '已开始',
    [BIDDING_STATUS.SUBMITTING]: '提交RFP中',
    [BIDDING_STATUS.REVIEWING]: '委员审议RFP中',
    [BIDDING_STATUS.SELECTED]: '已选定RFP',
    [BIDDING_STATUS.PUBLISHED]: '已公开RFP',
  },
}
