// File untuk mendefinisikan semua relasi model
// Import semua model
import TransactionHeader from "./TransactionHeader";
import TransactionDetail from "./TransactionDetail";
import MsCategory from "./MsCategory";

// Definisikan relasi TransactionHeader <-> TransactionDetail
TransactionHeader.hasMany(TransactionDetail, {
  foreignKey: "transaction_id",
  as: "transaction_details",
  onDelete: "CASCADE",
});

TransactionDetail.belongsTo(TransactionHeader, {
  foreignKey: "transaction_id",
  as: "transaction_header",
});

// Definisikan relasi MsCategory <-> TransactionDetail
MsCategory.hasMany(TransactionDetail, {
  foreignKey: "transaction_category_id",
  as: "transaction_details",
});

TransactionDetail.belongsTo(MsCategory, {
  foreignKey: "transaction_category_id",
  as: "category",
});
