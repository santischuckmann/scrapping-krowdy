import mongoose from ('mongoose')

const Experience = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  startingDate: {
    type: Date
  },
  endingDate: {
    type: Date,
  }
})

const ProfileInfo = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
  },
  experience: {
    type: [String],
  },
})

const model = mongoose.model('ProfileInfo', ProfileInfo)

export default ProfileInfo;
