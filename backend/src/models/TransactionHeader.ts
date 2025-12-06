import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Atribut untuk TransactionHeader
type TransactionHeaderAttributes = {
  id: number;
  description: string;
  code: string;
  rate_euro: number;
  date_paid: Date;
  created_at?: Date;
  updated_at?: Date;
};

// Atribut untuk create (id, created_at, updated_at optional)
type TransactionHeaderCreationAttributes = Optional<
  TransactionHeaderAttributes,
  "id" | "created_at" | "updated_at"
>;

// Model TransactionHeader
class TransactionHeader
  extends Model<
    TransactionHeaderAttributes,
    TransactionHeaderCreationAttributes
  >
  implements TransactionHeaderAttributes
{
  public id!: number;
  public description!: string;
  public code!: string;
  public rate_euro!: number;
  public date_paid!: Date;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Relasi dengan TransactionDetail (akan didefinisikan di associations.ts)
  public transaction_details?: any[];
}

TransactionHeader.init(
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
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    date_paid: {
      type: DataTypes.DATE,
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
    tableName: "transaction_header",
    timestamps: true,
    underscored: true,
  }
);

export default TransactionHeader;
