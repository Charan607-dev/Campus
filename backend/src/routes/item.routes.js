
import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeAdmin } from "../middleware/authorizeAdmin.js";
import {
    listItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
} from "../controllers/item.controller.js";

const router = Router();

router.get("/", listItems);
router.get("/:id", getItem);

router.post("/", authenticate, createItem);
router.patch("/:id", authenticate, updateItem);
router.delete("/:id", authenticate, authorizeAdmin, deleteItem);

export default router;
