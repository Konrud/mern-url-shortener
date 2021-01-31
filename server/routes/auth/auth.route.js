import { Router } from "express";
import AUTH_CONTROLLER from "../../controllers/auth/auth.controller";

const ROUTER = Router();

// `/api/auth`
ROUTER.get("/", function (req, res, next) {
    debugger;
});

// `/api/auth`
ROUTER.post("/register", AUTH_CONTROLLER.getRegistrationValidationRules(), AUTH_CONTROLLER.register);


// `/api/auth`
ROUTER.post("/login", AUTH_CONTROLLER.getLoginValidationRules(), AUTH_CONTROLLER.login);


export default ROUTER;