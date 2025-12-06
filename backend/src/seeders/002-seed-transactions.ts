import { QueryInterface } from "sequelize";

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  // Get category IDs
  const [categories] = await queryInterface.sequelize.query(
    'SELECT id, name FROM ms_category WHERE name IN ("income", "expense")'
  );
  const categoryMap: Record<string, number> = {};
  (categories as Array<{ id: number; name: string }>).forEach((cat) => {
    categoryMap[cat.name] = cat.id;
  });

  const incomeId = categoryMap["income"];
  const expenseId = categoryMap["expense"];

  // Generate 25 transactions (lebih dari 20 untuk testing paginasi)
  const transactions: Array<{
    description: string;
    code: string;
    rate_euro: number;
    date_paid: Date;
    created_at: Date;
    updated_at: Date;
  }> = [];
  const transactionDetails: Array<{
    transaction_id: number;
    transaction_category_id: number;
    name: string;
    value_idr: number;
    created_at: Date;
    updated_at: Date;
  }> = [];

  const descriptions = [
    "Sewa Mobil Harian",
    "Sewa Motor Mingguan",
    "Sewa Truk Bulanan",
    "Sewa Bus Wisata",
    "Sewa Minibus",
    "Sewa Sedan",
    "Sewa SUV",
    "Sewa Pickup",
    "Sewa Van",
    "Sewa Wagon",
  ];

  const codes = [];
  for (let i = 1; i <= 25; i++) {
    codes.push(`TRX-${String(i).padStart(4, "0")}`);
  }

  const transactionNames = {
    income: [
      "Pembayaran Sewa",
      "DP Pembayaran",
      "Pelunasan Sewa",
      "Biaya Tambahan",
      "Denda Keterlambatan",
    ],
    expense: [
      "Biaya Maintenance",
      "Biaya BBM",
      "Biaya Asuransi",
      "Biaya Parkir",
      "Biaya Tol",
    ],
  };

  // Create 25 transactions
  for (let i = 0; i < 25; i++) {
    const datePaid = new Date(2024, 0, 1);
    datePaid.setDate(datePaid.getDate() + i * 3); // Spread dates

    const transaction = {
      description: descriptions[i % descriptions.length],
      code: codes[i],
      rate_euro: 15000 + Math.random() * 5000,
      date_paid: datePaid,
      created_at: new Date(),
      updated_at: new Date(),
    };

    transactions.push(transaction);
  }

  // Insert transactions
  await queryInterface.bulkInsert("transaction_header", transactions);

  // Get inserted transaction IDs
  const [insertedIds] = await queryInterface.sequelize.query(
    "SELECT id FROM transaction_header ORDER BY id DESC LIMIT 25"
  );
  const transactionIds = (insertedIds as Array<{ id: number }>).map(
    (t) => t.id
  );

  // Create transaction details for each transaction
  transactionIds.forEach((transactionId, index) => {
    // Add 1-3 income details
    const incomeCount = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < incomeCount; j++) {
      transactionDetails.push({
        transaction_id: transactionId,
        transaction_category_id: incomeId,
        name: transactionNames.income[
          Math.floor(Math.random() * transactionNames.income.length)
        ],
        value_idr: Math.floor(Math.random() * 5000000) + 1000000,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // Add 1-3 expense details
    const expenseCount = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < expenseCount; j++) {
      transactionDetails.push({
        transaction_id: transactionId,
        transaction_category_id: expenseId,
        name: transactionNames.expense[
          Math.floor(Math.random() * transactionNames.expense.length)
        ],
        value_idr: Math.floor(Math.random() * 2000000) + 500000,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
  });

  // Insert transaction details
  await queryInterface.bulkInsert("transaction_detail", transactionDetails);
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  // Delete transaction details first (due to foreign key)
  await queryInterface.bulkDelete("transaction_detail", {});
  // Delete transactions
  await queryInterface.bulkDelete("transaction_header", {});
};
