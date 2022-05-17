import mongoose from ('mongoose')

const TitleAndDate = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  Date: {
    type: String
  }
})

const nestedModel = mongoose.modal('TitleAndDate', TitleAndDate)

const ProfileInfo = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
  },
  experience: {
    type: [TitleAndDate],
  },
  education: {
    type: [TitleAndDate]
  }
})

const model = mongoose.model('ProfileInfo', ProfileInfo)

export default ProfileInfo;
