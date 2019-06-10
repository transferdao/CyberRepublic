import { BIDDING_STATUS } from '@/constant'

// proposal bidding
export default {
  status: {
    [BIDDING_STATUS.NOT_NEEDED]: 'Not needed',
    [BIDDING_STATUS.UNSTARTED]: 'Unstarted',
    [BIDDING_STATUS.STARTED]: 'Started',
    [BIDDING_STATUS.SUBMITTING]: 'Submitting RFP',
    [BIDDING_STATUS.REVIEWING]: 'Council Reviewing RFP',
    [BIDDING_STATUS.SELECTED]: 'RFP(s) Selected',
    [BIDDING_STATUS.PUBLISHED]: 'RFP(s) Published',
    [BIDDING_STATUS.CLOSED]: 'CLOSED',
  },
  biddingStatus: 'Bidding Status',
  dateText: {
    days: 'Days',
    hours: 'Hours',
    mins: 'Mins',
    secs: 'Secs',
  }
}
