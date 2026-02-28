import Idea from "../models/idea.js";

export async function createIdea(req, res) {
  try {
    const { title, description, tags } = req.body;
    const userId = req.user?.userId || req.user?._id;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    const idea = await Idea.create({
      title: title,
      description: description,
      tags: tags,
      createdBy: userId,
    });

    return res.status(201).json({
      message: "Idea created successfully",
      data: idea,
    });
  } catch (error) {
    const message = error?.message || "Error creating idea";
    res.status(500).json({
      message,
      error: error.message,
    });
  }
}

export async function getIdea(req, res) {
  try {
    const userId = req.user?.userId || req.user?._id;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    const idea = await Idea.find({ createdBy: userId });

    console.log(req.user);

    if (idea.length === 0)
      return res.status(400).json({
        message: "idea is not there",
      });

    return res.status(200).json({
      data: idea,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching ideas",
      error: error.message,
    });
  }
}

export async function updateIdea(req, res) {
  try {
    const { id } = req.params;
    const { state } = req.body;
    const userId = req.user?.userId || req.user?._id;

    if (!state)
      return res.status(400).json({
        message: "State is required",
      });
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const idea = await Idea.findOneAndUpdate(
      { _id: id, createdBy: userId },
      { state: state },
      { new: true },
    );

    if (!idea) {
      return res.status(404).json({
        message: "Idea not found or you don't have permission to update it",
      });
    }

    return res.status(200).json({
      message: "Idea updated successfully",
      data: idea,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating idea",
      error: err.message,
    });
  }
}

export async function deleteIdea(req, res) {
  try {
    Idea.findByIdAndDelete(req.params.id);
    return res.json({ message: "idea delted" });
  } catch (err) {
    return res.json({
      error: err.message,
    });
  }
}
