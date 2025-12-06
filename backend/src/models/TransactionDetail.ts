import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Atribut untuk TransactionDetail
type TransactionDetailAttributes = {
  id: number;
  transaction_id: number;
  transaction_category_id: number;
  name: string;
  value_idr: number;
  created_at?: Date;
  updated_at?: Date;
};

// Atribut untuk create (id, created_at, updated_at optional)
type TransactionDetailCreationAttributes = Optional<
  TransactionDetailAttributes,
  "id" | "created_at" | "updated_at"
>;

// Model TransactionDetail
class TransactionDetail
  extends Model<
    TransactionDetailAttributes,
    TransactionDetailCreationAttributes
  >
  implements TransactionDetailAttributes
{
  public id!: number;
  public transaction_id!: number;
  public transaction_category_id!: number;
  public name!: string;
  public value_idr!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Relasi (akan didefinisikan di associations.ts)
  public transaction_header?: any;
  public category?: any;
}

TransactionDetail.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    transaction_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "transaction_header",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    transaction_category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "ms_category",
        key: "id",
      },
      onDelete: "RESTRICT",
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    value_idr: {
      type: DataTypes.DOUBLE,
      allowNull: false,
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
    tableName: "transaction_detail",
    timestamps: true,
    underscored: true,
  }
);

export default TransactionDetail;
