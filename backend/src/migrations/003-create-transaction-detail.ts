import { QueryInterface, DataTypes } from "sequelize";

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.createTable("transaction_detail", {
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
  });

  await queryInterface.addIndex("transaction_detail", ["transaction_id"], {
    name: "idx_transaction_id",
  });
  await queryInterface.addIndex(
    "transaction_detail",
    ["transaction_category_id"],
    {
      name: "idx_transaction_category_id",
    }
  );
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.dropTable("transaction_detail");
};
