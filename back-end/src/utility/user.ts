import * as _ from 'lodash'

export default {
  formatUsername(user) {
    const firstName = user.profile && user.profile.firstName
    const lastName = user.profile && user.profile.lastName

    if (_.isEmpty(firstName) && _.isEmpty(lastName)) {
        return user.username
    }

    return [firstName, lastName].join(' ')
  },
  isSelf(userIdA: any, userIdB: any) {
    if (!userIdA || !userIdB) return false

    return userIdA.toString() === userIdB.toString()
  }
}
