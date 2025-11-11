import cloudinary from "../config/cloudinary.js";
import shirtService from "../services/stripedShirtService.js";
import streamifier from "streamifier";

const streamUpload = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const createStripedShirt = async (req, res) => {
  try {
    const { name, brand, sizes } = req.body;

    if (!req.files || !name || !brand || !sizes)
      return res.status(400).json({ message: "All fields are required" });

    // Upload all images to Cloudinary
    const uploadResults = await Promise.all(
      req.files.map((file) => streamUpload(file.buffer, "striped-shirts"))
    );

    const shirt = await shirtService.create({
      name,
      brand,
      sizes: sizes.split(","), // Convert comma-separated string to array
      images: uploadResults.map((r) => r.secure_url),
    });

    res.status(201).json(shirt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// Get all shirts
export const getStripedShirts = async (req, res) => {
  try {
    const shirts = await shirtService.findAll();
    res.json(shirts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete shirt
export const deleteStripedShirt = async (req, res) => {
  try {
    const { id } = req.params;
    const shirt = await shirtService.findById(id);
    if (!shirt) return res.status(404).json({ message: "Shirt not found" });

    // Delete images from Cloudinary
    for (const imgUrl of shirt.images) {
      const parts = imgUrl.split("/");
      const filename = parts[parts.length - 1].split(".")[0];
      await cloudinary.uploader.destroy(`striped-shirts/${filename}`);
    }

    await shirtService.remove(id);
    res.json({ message: "Shirt deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE
export const updateStripedShirt = async (req, res) => {
  try {
    const shirt = await StripedShirt.findById(req.params.id);
    if (!shirt) return res.status(404).json({ message: "Shirt not found" });

    const { name, brand, size } = req.body;
    let imageUrl = shirt.imageUrl;

    if (req.file) {
      // Delete old image
      const publicId = shirt.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`striped-shirts/${publicId}`);

      // Upload new image
      const result = await cloudinary.uploader.upload_stream(
        { folder: "striped-shirts" },
        async (error, result) => {
          if (error) return res.status(500).json({ message: error.message });
          shirt.imageUrl = result.secure_url;
          shirt.name = name;
          shirt.brand = brand;
          shirt.size = size;
          await shirt.save();
          res.json(shirt);
        }
      );
      result.end(req.file.buffer);
    } else {
      shirt.name = name;
      shirt.brand = brand;
      shirt.size = size;
      await shirt.save();
      res.json(shirt);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
