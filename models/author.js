const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date }, // Added date_of_birth
  date_of_death: { type: Date }, // Added date_of_death
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  return fullname;
});

// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function () {
  let birth = this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(
        DateTime.DATE_SHORT
      )
    : "";
  let death = this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(
        DateTime.DATE_SHORT
      )
    : "";
  return birth && death ? birth + " - " + death : birth || death;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);
