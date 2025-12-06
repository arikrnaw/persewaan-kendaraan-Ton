import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import TransactionDetail from "./TransactionDetail";

// Atribut untuk Transaction
type TransactionAttributes = {
  id: number;
  description: string;
  code: string;
  rate_euro: number;
  date_paid: Date;
  created_at?: Date;
  updated_at?: Date;
};

// Atribut untuk create (id, created_at, updated_at optional)
type TransactionCreationAttributes = Optional<
  TransactionAttributes,
  "id" | "created_at" | "updated_at"
>;

// Model Transaction
class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id!: number;
  public description!: string;
  public code!: string;
  public rate_euro!: number;
  public date_paid!: Date;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Relasi dengan TransactionDetail
  public transaction_details?: TransactionDetail[];
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    rate_euro: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    date_paid: {
      type: DataTypes.DATEONLY,
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
    tableName: "transactions",
    timestamps: true,
    underscored: true,
  }
);

// Definisikan relasi
Transaction.hasMany(TransactionDetail, {
  foreignKey: "transaction_id",
  as: "transaction_details",
  onDelete: "CASCADE",
});

TransactionDetail.belongsTo(Transaction, {
  foreignKey: "transaction_id",
  as: "transaction",
});

export default Transaction;
