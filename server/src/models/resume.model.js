const mongoose = require("mongoose");

const resumeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  personal: {
    profilePic: { type: String, required: true },
    name: { type: String, required: true },
    tagLine:{ type: String, required: true },
    email: { type: String, required: true },
    mob: { type: String, required: true },
    linkedin: { type: String, required: true },
    address: { type: String, required: true },
    github: { type: String, required: true },
  },
  summary: { type: String, required: true },
  projects: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      gitLink: { type: String, required: true },
      liveLink: { type: String, required: true },
      features: [{ type: String, required: true }],
      techStack: [{ type: String, required: true }],
      areasOfResp: [{ type: String, required: true }],
      solo: false,
      team: { type: Number, required: false },
    },
  ],
  education: [
    {
      course: { type: String, required: true },
      institute: { type: String, required: true },
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
  ],
  techSkills: [{ type: String, required: true }],
  softSkills: [{ type: String, required: true }],
  accomplishments: [
    {
      title: { type: String, required: true },
      institute: { type: String, required: true },
      date: { type: String, required: true },
      certificateLink :{type:String}
    },
  ],
  interests: [{ type: String, required: true }],
});

module.exports = new mongoose.model("resume", resumeSchema);
