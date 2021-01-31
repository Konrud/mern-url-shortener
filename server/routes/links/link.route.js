import { Router } from "express";
import Link_Controller from "../../controllers/link/link.controller";
import authMiddleware from "../../middleware/auth/auth.middleware";

const ROUTER = Router();

ROUTER.get("/", authMiddleware.getTokenMiddleware, Link_Controller.getAllLinks);

ROUTER.post("/generate", authMiddleware.getTokenMiddleware, Link_Controller.generateLink);

ROUTER.get("/:id", authMiddleware.getTokenMiddleware, Link_Controller.getLinkByID);


export default ROUTER;

