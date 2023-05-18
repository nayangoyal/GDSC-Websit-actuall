const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timeline: {
    day: { type: String, required: true },
    startDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endDate: { type: String, required: true },
    endTime: { type: String, required: true },
    venue: { type: String },
  },
  photo: {
    //URL of picture
    type: String,
  },
  projectLink: {
    //Deployed Project Link
    type: String,
  },
  github: {
    //Project's Github Link
    type: String,
  },
  domains: [
    {
      type: String,
      enum: ["development", "creative", "management", "gamedev", "cp", "aiml"],
      required: true,
    },
  ],
  teamMentors: [
    {
      type: String,
    },
  ],
  teamMembers: [
    {
      type: String,
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
