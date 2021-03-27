import dotenv from "dotenv";
dotenv.config();

import ProfileModal from "../models/Profile.js";

export const getProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModal.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const getProfileDetail = async (req, res) => {
  try {
    const profileDetail = await ProfileModal.findOne({ _id: req.params.id });
    res.status(200).json(profileDetail);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const createProfile = async (req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  const profile = req.body;
  if (profile && profile.name.trim() === "") {
    return res.status(400).json({ name: "Required" });
  } else if (profile && profile.Image.trim() === "") {
    return res.status(400).json({ Image: "Image is required" });
  }
  try {
    const newProfile = await ProfileModal.create({
      ...profile,
    });
    res.status(201).send(newProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  const { id: _id } = req.params;
  const body = req.body;
  if (body.name.trim() === "") {
    return res.status(400).json({ title: "Required" });
  }
  if (body.Image.trim() === "") {
    ``;
    return res.status(400).json({ Image: "Image is required" });
  }
  try {
    const post = await ProfileModal.findOne({ _id });
    const updatedPost = await ProfileModal.findByIdAndUpdate(_id, body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "update not successful" });
  }
};

export const deleteProfile = async (req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  const { id } = req.params;
  try {
    const isProfileFound = await ProfileModal.findOne({ _id: id });
    if (isProfileFound) {
      await ProfileModal.findByIdAndDelete(id);
    }
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "delete not successful" });
  }
};
