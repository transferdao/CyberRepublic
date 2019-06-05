import Base from './Base'
import * as _ from 'lodash'
import { constant } from '../constant'

export default class extends Base {
  private model: any
  protected init() {
    this.model = this.getDBModel('Bidding')
  }

  // attend bidding
  public async bid(param: any): Promise<Document> {
    const db_cvote = this.getDBModel('CVote')
    const userId = _.get(this.currentUser, '_id')
    const { _id, file } = param

    const cur = await db_cvote.findOne({ _id })
    if (!cur) {
      throw 'invalid proposal id'
    }
    const isFileExisted = await db_cvote.findOne({ _id, 'bidding.files.user': userId })

    if (isFileExisted) {
      await db_cvote.update({ _id, 'bidding.files.user': userId }, {
        $set: {
          // 'bidding.files.$.user': userId,
          'bidding.files.$.file': file,
        },
      })
    } else {
      await db_cvote.update({ _id }, {
        $push: {
          'bidding.files': {
            user: userId,
            file,
          }
        }
      })
    }

    return await this.show(_id)
  }

  public async create(param: any): Promise<Document> {
    // get param
    const { files, proposal } = param
    const doc: any = {
      files,
      proposal,
      createdBy: _.get(this.currentUser, '_id'),
    }

    // save the document
    const result = await this.model.save(doc)

    return result
  }

  public async update(param: any): Promise<Document> {
    // get param
    const { id, files, proposalId } = param
    const db_cvote = this.getDBModel('CVote')
    const proposal = db_cvote.findById(proposalId)
    if (!proposal) throw 'proposal not existed'
    // check if bidding id ended
    if (!proposal.biddingStatus === constant.BIDDING_STATUS.CLOSED) return

    // build document object
    const doc: any = {
      files,
    }

    await this.model.update({_id: id}, {$set: doc })

    return await this.show({ id })
  }

  public async list(param: any): Promise<Object> {
    const { proposalId } = param
    const db_cvote = this.getDBModel('CVote')
    const proposal = db_cvote.findById(proposalId)
    if (!proposal) throw 'proposal not existed'
    // check if bidding id ended
    if (!proposal.biddingStatus === constant.BIDDING_STATUS.CLOSED) return
    const query: any = {
      proposal: proposalId,
    }

    const list = await this.model.getDBInstance(query).find().sort({ createdAt: -1 })
    const total = list.length

    return {
      list,
      total,
    }
  }

  public async listSelf(param: any): Promise<Object> {
    const { proposalId } = param
    const userId = _.get(this.currentUser, '_id')
    if (!userId) return
    const query: any = {
      createdBy: userId,
      proposal: proposalId,
    }

    const list = await this.model.getDBInstance().find(query).sort({ createdAt: -1 })
    const total = list.length

    return {
      list,
      total,
    }
  }

  public async show(param: any): Promise<Document> {
    const { id: _id } = param
    const db_cvote = this.getDBModel('CVote')
    const proposal = db_cvote.findById(_id)
    if (!proposal) throw 'proposal not existed'
    const doc = await this.model.getDBInstance()
      .findById(_id)

    return doc
  }

  // public async delete(param: any): Promise<boolean> {
  //   const { id: _id } = param
  //   await this.model.findByIdAndDelete(_id)

  //   return true
  // }


  // bidding update
  public async updateBidding(param: any): Promise<Document> {
    const db_cvote = this.getDBModel('CVote')
    const { _id, status, endDate, template } = param

    const cur = await db_cvote.findOne({ _id })
    if (!cur) {
      throw 'invalid proposal id'
    }

    const updateObj: any = {}
    if (status) updateObj['bidding.status'] = status
    if (endDate) updateObj['bidding.endDate'] = endDate
    if (template) updateObj['bidding.template'] = template

    const rs = await db_cvote.update({ _id }, {
      $set: {
        ...updateObj,
      }
    })

    return await this.show(_id)
  }


}
