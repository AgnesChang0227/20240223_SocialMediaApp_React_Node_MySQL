import express from "express";
import {addRelationship, deleteRelationship, getRelationships,latestActivities} from "../controllers/relationship.js";

const router = express.Router();

router.get("/",getRelationships);
router.post("/",addRelationship);
router.delete("/",deleteRelationship);
router.get("/latestActs",latestActivities);

export default router;

