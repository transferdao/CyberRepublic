import Base from '../Base'
import CommentService from '../../service/CommentService'

export default class extends Base {
  protected needLogin = true

  public async action() {
    const commentService = this.buildService(CommentService)
    const param = this.getParam()
    param.createdBy = this.session.user
    const rs = await commentService.update('Suggestion', param)
    return this.result(1, rs)
  }
}
