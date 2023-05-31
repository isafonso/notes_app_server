import { NextFunction, Request, Response } from "express";
import Sequelize from "sequelize";
import NotesModel from "../models/NotesModel";

class NotesController {
  public async index(req: Request, res: Response, next: NextFunction) {
    if (req.url == "/") {
      try {
        const viewData = await NotesModel.findAll();
        res.status(200).json(viewData);
      } catch (error) {
        res.status(400).json(error);
      }
    } else if (
      req.url == `/?pesquisa=${encodeURIComponent(String(req.query.pesquisa))}`
    ) {
      try {
        const viewData = await NotesModel.findAll({
          where: {
            title: req.query.pesquisa,
          },
        });
        res.status(200).render("searchData", { viewData });
      } catch (error) {
        res.status(400).json(error);
      }
    } else {
    }
  }

  public async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content } = req.body;

      const note = await NotesModel.create({
        title: title,
        content: content,
      });

      await note.save();

      console.log(note);

      res.status(200).json(note);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  public async read(req: Request, res: Response) {
    try {
      const { search } = req.body;
      const viewData = await NotesModel.findAll({
        where: {
          [Sequelize.Op.or]: {
            title: { [Sequelize.Op.like]: `%${search}%` },
            content: { [Sequelize.Op.like]: `%${search}%` },
          },
        },
      });
      console.log(viewData);
      //@ts-ignore
      res.status(200).redirect(`/?pesquisa=${viewData[0].title}`);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const viewData = await NotesModel.findOne({
        where: { id: id },
      });

      res.status(200).json(viewData);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      await NotesModel.update(
        { title, content },
        {
          where: { id: id },
        }
      );
      res.status(200).redirect("/");
    } catch (error) {
      res.status(400).json(error);
    }
  }

  public async destroy(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const note = await NotesModel.destroy({
        where: { id: id },
      });
      return res.status(200).redirect("/");
    } catch (error) {
      console.log("Unable to delete product coz ", error);
    }
  }
}

export default new NotesController();
