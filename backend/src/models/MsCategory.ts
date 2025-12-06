import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Atribut untuk MsCategory
type MsCategoryAttributes = {
  id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
};

// Atribut untuk create (id, created_at, updated_at optional)
type MsCategoryCreationAttributes = Optional<
  MsCategoryAttributes,
  "id" | "created_at" | "updated_at"
>;

// Model MsCategory
class MsCategory
  extends Model<MsCategoryAttributes, MsCategoryCreationAttributes>
  implements MsCategoryAttributes
{
  public id!: number;
  public name!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Relasi dengan TransactionDetail (akan didefinisikan di associations.ts)
  public transaction_details?: any[];
}

MsCategory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "ms_category",
    timestamps: true,
    underscored: true,
  }
);

export default MsCategory;
