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
    [BIDDING_STATUS.CLOSED]: '已结束',
  },
  biddingStatus: '投标状态',
  dateText: {
    days: '天',
    hours: '小时',
    mins: '分',
    secs: '秒',
  },
  myRFP: {
    title: '我的RFP文件',
    note: '(<50MB, 仅支持PDF)'
  }
}
