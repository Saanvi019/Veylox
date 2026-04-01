import Project from "../models/project.js";

export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      owner: req.user.id,
    });

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating project" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user.id,
    });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting project" });
  }
};