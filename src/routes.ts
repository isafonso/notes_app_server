import { Router } from "express";
import NotesController from "./controllers/NotesController";

const router = Router();

router.get("/", NotesController.index);
router.post("/criar-anotacao", NotesController.store);
router.get("/editar-anotacao/:id", NotesController.show);
router.post("/pesquisa", NotesController.read);
router.put("/editar-anotacao/:id", NotesController.update);
router.delete("/deletar-anotacao/:id", NotesController.destroy);

export default router;
