import { Router } from "express";
import LINK_CONTROLLER from "../../controllers/link/link.controller";

const ROUTER = Router();

ROUTER.get("/:codedUrl", LINK_CONTROLLER.redirectCodedURL)


export default ROUTER;
