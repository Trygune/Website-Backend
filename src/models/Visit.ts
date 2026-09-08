import mongoose, { type HydratedDocument } from 'mongoose'

export interface IVisit {
  id: string
  visitorId: string
  path: string
}

export type VisitDocument = HydratedDocument<IVisit>

const visitSchema = new mongoose.Schema<IVisit>(
  {
    visitorId: {
      type: String,
      required: true,
      index: true,
    },

    path: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

visitSchema.index({ createdAt: 1 })

visitSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    const result = ret as unknown as Record<string, unknown>
    delete result._id
    delete result.__v

    return result
  },
})

const Visit = mongoose.model<IVisit>('visits', visitSchema)

export default Visit
