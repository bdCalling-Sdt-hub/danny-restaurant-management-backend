import { Schema, model } from "mongoose";
import { daysOfWeek } from "./branch.constant";
import { TBranch } from "./branch.interface";
const branchSchema = new Schema<TBranch>(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    daysOfWeek: {
      type: String,
      enum: Object.values(daysOfWeek),
      required: true,
    },
    tables: {
      type: Number,
      required: true,
      default: 0,
    },
    sunday: {
      openTime: String,
      closeTime: String,
      isClosed: Boolean,
    },
    monday: {
      openTime: String,
      closeTime: String,
      isClosed: Boolean,
    },
    tuesday: {
      openTime: String,
      closeTime: String,
      isClosed: Boolean,
    },
    wednesday: {
      openTime: String,
      closeTime: String,
      isClosed: Boolean,
    },
    thursday: {
      openTime: String,
      closeTime: String,
      isClosed: Boolean,
    },
    friday: {
      openTime: String,
      closeTime: String,
      isClosed: Boolean,
    },
    saturday: {
      openTime: String,
      closeTime: String,
      isClosed: Boolean,
    },
    endTimeLimit: {
      type: Number,
      default: 2,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

branchSchema.pre("save", function (next) {
  const branch = this;
  Object.values(daysOfWeek).forEach((day) => {
    if (branch.daysOfWeek.includes(day)) {
      branch[day].isClosed = true;
      branch[day].openTime = "00:00";
      branch[day].closeTime = "00:00";
    }
  });
  next();
});
// filter out deleted documents
branchSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

branchSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

branchSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Branch = model<TBranch>("Branch", branchSchema);
