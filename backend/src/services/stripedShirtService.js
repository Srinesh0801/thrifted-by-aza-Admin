import StripedShirt from "../models/stripedShirtModel.js";

// Create
const create = async (data) => {
  const shirt = new StripedShirt(data);
  return await shirt.save();
};

// Get all
const findAll = async () => {
  return await StripedShirt.find();
};

// Find by ID
const findById = async (id) => {
  return await StripedShirt.findById(id);
};

// Delete by ID
const remove = async (id) => {
  return await StripedShirt.findByIdAndDelete(id);
};
const update = async (id, data) => {
  return await StripedShirt.findByIdAndUpdate(id, data, { new: true });
};


export default { create, findAll, findById, remove,update };
