const validateTask = (req, res, next) => {
  const { title, description, dueDate } = req.body;

  // Validate title
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ msg: "Title is required and must be non-empty" });
  }

  if (title.trim().length > 200) {
    return res.status(400).json({ msg: "Title must not exceed 200 characters" });
  }

  // Validate description if provided
  if (description && typeof description !== 'string') {
    return res.status(400).json({ msg: "Description must be a string" });
  }

  if (description && description.length > 1000) {
    return res.status(400).json({ msg: "Description must not exceed 1000 characters" });
  }

  // Validate due date if provided
  if (dueDate) {
    const dateObj = new Date(dueDate);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ msg: "Invalid due date format" });
    }

    // Optional: Ensure due date is not in the past
    if (dateObj < new Date()) {
      return res.status(400).json({ msg: "Due date cannot be in the past" });
    }
  }

  // Validate status if provided in update request
  if (req.body.status && !['Pending', 'Completed'].includes(req.body.status)) {
    return res.status(400).json({ msg: "Status must be either 'Pending' or 'Completed'" });
  }

  next();
};

module.exports = validateTask;