import Paper from "../models/Paper.js";

// GET /api/papers?grade=10&medium=Sinhala&subject=Science&paperCategory=Past Paper
export const getPapers = async (req, res) => {
  try {
    const { grade, medium, subject, paperCategory } = req.query;

    const filter = {};

    if (grade) filter.grade = grade;
    if (medium) filter.medium = medium;
    if (subject) filter.subject = subject;
    if (paperCategory) filter.paperCategory = paperCategory;

    const papers = await Paper.find(filter).sort({ createdAt: -1 });
    res.json(papers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/papers
export const createPaper = async (req, res) => {
  try {
    const newPaper = new Paper(req.body);
    await newPaper.save();
    res.status(201).json(newPaper);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/papers/:id
export const updatePaper = async (req, res) => {
  try {
    const updatedPaper = await Paper.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedPaper);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/papers/:id
export const deletePaper = async (req, res) => {
  try {
    await Paper.findByIdAndDelete(req.params.id);
    res.json({ message: "Paper deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
