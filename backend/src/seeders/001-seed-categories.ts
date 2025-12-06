import { QueryInterface } from "sequelize";

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.bulkInsert("ms_category", [
    { name: "income", created_at: new Date(), updated_at: new Date() },
    { name: "expense", created_at: new Date(), updated_at: new Date() },
  ]);
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.bulkDelete("ms_category", {
    name: ["income", "expense"],
  });
};
