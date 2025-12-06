import { Request, Response } from "express";
import { Op } from "sequelize";
import TransactionHeader from "../models/TransactionHeader";
import TransactionDetail from "../models/TransactionDetail";
import MsCategory from "../models/MsCategory";
import sequelize from "../config/database";
import { CreateTransactionInput, UpdateTransactionInput } from "../types";
import { getOrCreateCategory } from "./categoryController";
import {
  validateCreateTransaction,
  validateUpdateTransaction,
} from "../utils/validation";

// GET all transactions dengan details, filtering, search, dan sorting
export const getAllTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Ambil query parameters
    const {
      search,
      date_from,
      date_to,
      category,
      sort_by = "created_at",
      sort_order = "DESC",
    } = req.query;

    // Build where clause untuk TransactionHeader
    const whereClause: any = {};

    // Search: cari di description dan code
    if (search && typeof search === "string") {
      whereClause[Op.or] = [
        { description: { [Op.like]: `%${search}%` } },
        { code: { [Op.like]: `%${search}%` } },
      ];
    }

    // Filter range tanggal
    if (date_from || date_to) {
      whereClause.date_paid = {};
      if (date_from && typeof date_from === "string") {
        whereClause.date_paid[Op.gte] = date_from;
      }
      if (date_to && typeof date_to === "string") {
        whereClause.date_paid[Op.lte] = date_to;
      }
    }

    // Build where clause untuk TransactionDetail (filter kategori via ms_category)
    const detailWhereClause: any = {};
    if (category && typeof category === "string") {
      // Cari category by name
      const categoryRecord = await MsCategory.findOne({
        where: {
          name: {
            [Op.like]: category.trim(),
          },
        },
      });

      if (categoryRecord) {
        detailWhereClause.transaction_category_id = categoryRecord.id;
      }
    }

    // Validasi sort_by dan sort_order
    const allowedSortFields = [
      "id",
      "description",
      "code",
      "rate_euro",
      "date_paid",
      "created_at",
      "updated_at",
    ];
    const validSortBy = allowedSortFields.includes(sort_by as string)
      ? (sort_by as string)
      : "created_at";
    const validSortOrder =
      (sort_order as string).toUpperCase() === "ASC" ? "ASC" : "DESC";

    // Query transactions dengan filtering
    const transactions = await TransactionHeader.findAll({
      where: whereClause,
      include: [
        {
          model: TransactionDetail,
          as: "transaction_details",
          include: [
            {
              model: MsCategory,
              as: "category",
            },
          ],
          where:
            Object.keys(detailWhereClause).length > 0
              ? detailWhereClause
              : undefined,
          required: Object.keys(detailWhereClause).length > 0 ? true : false, // INNER JOIN jika ada filter kategori
        },
      ],
      order: [[validSortBy, validSortOrder]],
      subQuery: false,
    });

    // Cek apakah ada filter aktif
    const hasActiveFilters = !!search || !!date_from || !!date_to || !!category;

    res.status(200).json({
      success: true,
      data: transactions,
      message: "Transactions retrieved successfully",
      meta: {
        total: transactions.length,
        filters: {
          search: search || null,
          date_from: date_from || null,
          date_to: date_to || null,
          category: category || null,
          sort_by: validSortBy,
          sort_order: validSortOrder,
        },
        has_active_filters: hasActiveFilters,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error retrieving transactions",
      error: error.message,
    });
  }
};

// GET single transaction by ID
export const getTransactionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validasi ID
    const transactionId = parseInt(id);
    if (isNaN(transactionId) || transactionId <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid transaction ID",
      });
      return;
    }

    const transaction = await TransactionHeader.findByPk(transactionId, {
      include: [
        {
          model: TransactionDetail,
          as: "transaction_details",
          include: [
            {
              model: MsCategory,
              as: "category",
            },
          ],
        },
      ],
    });

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: transaction,
      message: "Transaction retrieved successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error retrieving transaction",
      error: error.message,
    });
  }
};

// CREATE new transaction dengan details
export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      description,
      code,
      rate_euro,
      date_paid,
      transaction_details,
    }: CreateTransactionInput = req.body;

    // Validasi server-side lengkap
    const validation = validateCreateTransaction(req.body);
    if (!validation.isValid) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
      return;
    }

    // Cek apakah code sudah ada
    const existingTransaction = await TransactionHeader.findOne({
      where: { code },
    });

    if (existingTransaction) {
      res.status(400).json({
        success: false,
        message: "Transaction code already exists",
      });
      return;
    }

    // Buat transaction dengan transaction details menggunakan transaction
    const result = await sequelize.transaction(async (t) => {
      // Buat master transaction header
      const transaction = await TransactionHeader.create(
        {
          description,
          code,
          rate_euro,
          date_paid: new Date(date_paid),
        },
        { transaction: t }
      );

      // Buat transaction details dengan auto-create category jika belum ada
      const details = await Promise.all(
        transaction_details.map(async (detail) => {
          // Get atau create category
          const category = await getOrCreateCategory(detail.category_name);

          // Buat transaction detail
          return await TransactionDetail.create(
            {
              transaction_id: transaction.id,
              transaction_category_id: category.id,
              name: detail.name,
              value_idr: detail.value_idr,
            },
            { transaction: t }
          );
        })
      );

      // Reload transaction dengan details dan category
      await transaction.reload({
        include: [
          {
            model: TransactionDetail,
            as: "transaction_details",
            include: [
              {
                model: MsCategory,
                as: "category",
              },
            ],
          },
        ],
        transaction: t,
      });

      return transaction;
    });

    res.status(201).json({
      success: true,
      data: result,
      message: "Transaction created successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error creating transaction",
      error: error.message,
    });
  }
};

// UPDATE transaction
export const updateTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData: UpdateTransactionInput = req.body;

    // Validasi ID
    const transactionId = parseInt(id);
    if (isNaN(transactionId) || transactionId <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid transaction ID",
      });
      return;
    }

    // Validasi server-side lengkap
    const validation = validateUpdateTransaction(req.body);
    if (!validation.isValid) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
      return;
    }

    const transaction = await TransactionHeader.findByPk(transactionId);

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
      return;
    }

    // Jika code diubah, cek apakah code baru sudah ada
    if (updateData.code && updateData.code !== transaction.code) {
      const existingTransaction = await TransactionHeader.findOne({
        where: { code: updateData.code },
      });

      if (existingTransaction) {
        res.status(400).json({
          success: false,
          message: "Transaction code already exists",
        });
        return;
      }
    }

    // Update transaction dan details menggunakan transaction
    const result = await sequelize.transaction(async (t) => {
      // Prepare update data dengan convert date_paid jika ada
      const updatePayload: any = { ...updateData };
      if (updatePayload.date_paid) {
        updatePayload.date_paid = new Date(updatePayload.date_paid);
      }
      // Hapus transaction_details dari update payload karena akan dihandle terpisah
      delete updatePayload.transaction_details;

      // Update master transaction
      await transaction.update(updatePayload, { transaction: t });

      // Jika ada transaction_details, update details
      if (updateData.transaction_details) {
        // Hapus semua details lama
        await TransactionDetail.destroy({
          where: { transaction_id: transaction.id },
          transaction: t,
        });

        // Buat details baru dengan auto-create category jika belum ada
        await Promise.all(
          updateData.transaction_details.map(async (detail) => {
            // Get atau create category
            const category = await getOrCreateCategory(detail.category_name);

            // Buat transaction detail
            return await TransactionDetail.create(
              {
                transaction_id: transaction.id,
                transaction_category_id: category.id,
                name: detail.name,
                value_idr: detail.value_idr,
              },
              { transaction: t }
            );
          })
        );
      }

      // Reload transaction dengan details dan category
      await transaction.reload({
        include: [
          {
            model: TransactionDetail,
            as: "transaction_details",
            include: [
              {
                model: MsCategory,
                as: "category",
              },
            ],
          },
        ],
        transaction: t,
      });

      return transaction;
    });

    res.status(200).json({
      success: true,
      data: result,
      message: "Transaction updated successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error updating transaction",
      error: error.message,
    });
  }
};

// DELETE transaction
export const deleteTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validasi ID
    const transactionId = parseInt(id);
    if (isNaN(transactionId) || transactionId <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid transaction ID",
      });
      return;
    }

    const transaction = await TransactionHeader.findByPk(transactionId);

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
      return;
    }

    // Hapus transaction (details akan terhapus otomatis karena CASCADE)
    await transaction.destroy();

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting transaction",
      error: error.message,
    });
  }
};
