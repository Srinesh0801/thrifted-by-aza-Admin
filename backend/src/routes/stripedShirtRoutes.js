import express from "express";
import { upload } from "../middleware/uploads.js";
import {
  getStripedShirts,
  createStripedShirt,
  deleteStripedShirt,
  updateStripedShirt
} from "../controllers/stripedShirtController.js";

const router = express.Router();

router.get("/", getStripedShirts);
// Upload multiple images, field name must be 'images'
router.post("/", upload.array("images", 5), createStripedShirt);
router.delete("/:id", deleteStripedShirt);

router.put("/:id", upload.single("image"), updateStripedShirt);


export default router;
