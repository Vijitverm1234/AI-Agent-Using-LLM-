import { inngest } from "../inngest/client";
import Ticket from "../models/ticket.js";

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "title or descirption are required" });
    }
    const newTicket = Ticket.create({
      title,
      description,
      createBy: req.user._id.to_string(),
    });
    await inngest.send({
      name: "ticket/created",
      data: {
        ticketId: (await newTicket)._id.toString(),
        title,
        description,
        createdBy: req.user._id.toString(),
      },
    });
    return res.status(201).json({
      message: "Tickey created and processing started",
      ticket: newTicket,
    });
  } catch (error) {
    console.log("error while creating ticket");
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getTickets = async (req, res) => {
  try {
    const user = req.user;
    let tickets = [];
    if (user.role !== "user") {
      tickets = Ticket.find({})
        .populate("assignedTo", ["email", "_id"])
        .sort({ createdAt: -1 });
    } else {
      tickets = await Ticket.find({ createBy: user._id })
        .select("title description status createdAt")
        .sort({ createdAt: -1 });
    }
    return res.status(200).json(tickets);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error in fectching ticket" });
  }
};
export const getTicket = async (req, res) => {
  try {
    const user = req.user;
    let ticket;
    if (user.role !== "user") {
      ticket = await Ticket.findById(req.params.id).populate("assignedTo", [
        "email",
        "_id",
      ]);
    } else {
      ticket = Ticket.findOne({
        createBy: user._id,
        _id: req.params.id,
      }).select("titlt desciption status createdAt");
    }
    if (!token) {
      return res.status(404).json({ message: "No ticket found" });
    }
    return res.status(200).json({ ticket });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error in fectching ticket" });
  }
};
