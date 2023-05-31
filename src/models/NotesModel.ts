import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class NotesModel extends Model {}

NotesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "notes" }
);

export default NotesModel;
