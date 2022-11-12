import mongoose from "mongoose";

import Messages from "../models/dbMessages.js";

export const getChats = async (req, res) => {
  try {
    const chatMessages = await Messages.find();
    console.log(chatMessages);
    res.status(200).json(chatMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createChat = async (req, res) => {
  const chat = req.body;

  const newChat = new Messages(chat);

  try {
    newChat.save();
    res.status(200).json(newChat);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
