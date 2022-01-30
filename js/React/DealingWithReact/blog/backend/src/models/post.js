import mongoose from 'mongoose'
const { Schema } = mongoose
// 몽구스 db 구조 생성

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
})

const Post = mongoose.model('Post', PostSchema)
export default Post
