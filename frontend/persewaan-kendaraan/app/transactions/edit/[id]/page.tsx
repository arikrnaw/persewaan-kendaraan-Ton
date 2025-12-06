"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import {
  transactionApi,
  categoryApi,
  type Category,
  type TransactionHeader,
} from "@/lib/api";

type TransactionItem = {
  id: string;
  category_name: string;
  name: string;
  value_idr: string;
};

type CategoryBox = {
  id: string;
  category_name: string;
  items: TransactionItem[];
};

export default function EditTransactionPage() {
  const router = useRouter();
  const params = useParams();
  const transactionId = Number(params.id);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Form state
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [rateEuro, setRateEuro] = useState("");
  const [datePaid, setDatePaid] = useState("");

  // Category boxes state - array of category boxes
  const [categoryBoxes, setCategoryBoxes] = useState<CategoryBox[]>([]);

  useEffect(() => {
    // Load categories
    categoryApi
      .getAll()
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error("Error loading categories:", err));

    // Load transaction data
    if (transactionId) {
      loadTransactionData();
    }
  }, [transactionId]);

  const loadTransactionData = async () => {
    try {
      setLoadingData(true);
      const res = await transactionApi.getById(transactionId);
      const transaction: TransactionHeader = res.data.data;

      // Set form fields
      setDescription(transaction.description);
      setCode(transaction.code);
      setRateEuro(transaction.rate_euro.toString());

      // Format date for input type="date" (YYYY-MM-DD)
      const date = new Date(transaction.date_paid);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      setDatePaid(`${year}-${month}-${day}`);

      // Group transaction details by category
      if (
        transaction.transaction_details &&
        transaction.transaction_details.length > 0
      ) {
        const groupedByCategory: Record<string, TransactionItem[]> = {};

        transaction.transaction_details.forEach((detail, index) => {
          const categoryName = detail.category?.name || "income";
          if (!groupedByCategory[categoryName]) {
            groupedByCategory[categoryName] = [];
          }
          groupedByCategory[categoryName].push({
            id: `detail-${detail.id}-${index}`,
            category_name: categoryName,
            name: detail.name,
            value_idr: detail.value_idr.toString(),
          });
        });

        // Convert grouped data to category boxes
        const boxes: CategoryBox[] = Object.entries(groupedByCategory).map(
          ([categoryName, items], index) => ({
            id: `box-${categoryName}-${index}`,
            category_name: categoryName,
            items:
              items.length > 0
                ? items
                : [
                    {
                      id: `item-${Date.now()}`,
                      category_name: categoryName,
                      name: "",
                      value_idr: "",
                    },
                  ],
          })
        );

        // If no boxes, create one default box
        if (boxes.length === 0) {
          setCategoryBoxes([
            {
              id: "1",
              category_name: "income",
              items: [
                {
                  id: "1-1",
                  category_name: "income",
                  name: "",
                  value_idr: "",
                },
              ],
            },
          ]);
        } else {
          setCategoryBoxes(boxes);
        }
      } else {
        // No details, create default box
        setCategoryBoxes([
          {
            id: "1",
            category_name: "income",
            items: [
              {
                id: "1-1",
                category_name: "income",
                name: "",
                value_idr: "",
              },
            ],
          },
        ]);
      }
    } catch (error: any) {
      console.error("Error loading transaction:", error);
      alert(
        error.response?.data?.message ||
          "Terjadi kesalahan saat memuat data transaksi"
      );
      router.push("/transactions");
    } finally {
      setLoadingData(false);
    }
  };

  // Tambah category box baru
  const addCategoryBox = () => {
    const defaultCategory =
      categories.length > 0 ? categories[0].name : "income";
    setCategoryBoxes([
      ...categoryBoxes,
      {
        id: Date.now().toString(),
        category_name: defaultCategory,
        items: [
          {
            id: `${Date.now()}-1`,
            category_name: defaultCategory,
            name: "",
            value_idr: "",
          },
        ],
      },
    ]);
  };

  // Hapus category box
  const removeCategoryBox = (boxId: string) => {
    setCategoryBoxes(categoryBoxes.filter((box) => box.id !== boxId));
  };

  // Update category di box
  const updateCategoryBox = (boxId: string, newCategory: string) => {
    setCategoryBoxes(
      categoryBoxes.map((box) => {
        if (box.id === boxId) {
          return {
            ...box,
            category_name: newCategory,
            items: box.items.map((item) => ({
              ...item,
              category_name: newCategory,
            })),
          };
        }
        return box;
      })
    );
  };

  // Tambah item ke category box
  const addItemToBox = (boxId: string) => {
    setCategoryBoxes(
      categoryBoxes.map((box) => {
        if (box.id === boxId) {
          return {
            ...box,
            items: [
              ...box.items,
              {
                id: `${boxId}-${Date.now()}`,
                category_name: box.category_name,
                name: "",
                value_idr: "",
              },
            ],
          };
        }
        return box;
      })
    );
  };

  // Hapus item dari category box
  const removeItemFromBox = (boxId: string, itemId: string) => {
    setCategoryBoxes(
      categoryBoxes.map((box) => {
        if (box.id === boxId) {
          return {
            ...box,
            items: box.items.filter((item) => item.id !== itemId),
          };
        }
        return box;
      })
    );
  };

  // Update item di category box
  const updateItemInBox = (
    boxId: string,
    itemId: string,
    field: keyof TransactionItem,
    value: string
  ) => {
    setCategoryBoxes(
      categoryBoxes.map((box) => {
        if (box.id === boxId) {
          return {
            ...box,
            items: box.items.map((item) =>
              item.id === itemId ? { ...item, [field]: value } : item
            ),
          };
        }
        return box;
      })
    );
  };

  const formatDateForAPI = (dateStr: string): string => {
    // Input type="date" already returns YYYY-MM-DD format
    return dateStr;
  };

  const parseNumber = (value: string): number => {
    // Remove dots and convert to number
    return parseFloat(value.replace(/\./g, "")) || 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Combine all items from all category boxes
      const allItems = categoryBoxes
        .flatMap((box) => box.items)
        .filter((item) => item.name.trim() && item.value_idr.trim());

      if (allItems.length === 0) {
        alert("Minimal harus ada 1 item transaksi");
        setLoading(false);
        return;
      }

      const transactionData = {
        description,
        code,
        rate_euro: parseNumber(rateEuro),
        date_paid: formatDateForAPI(datePaid),
        transaction_details: allItems.map((item) => ({
          category_name: item.category_name,
          name: item.name,
          value_idr: parseNumber(item.value_idr),
        })),
      };

      await transactionApi.update(transactionId, transactionData);
      alert("Transaksi berhasil diupdate!");
      router.push("/transactions");
    } catch (error: any) {
      console.error("Error updating transaction:", error);

      // Repopulate form dengan data yang sudah diisi jika ada error validasi
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan saat mengupdate transaksi";
      const errors = error.response?.data?.errors || [];

      // Tampilkan error dengan detail
      if (errors.length > 0) {
        alert(`Validasi gagal:\n${errors.join("\n")}`);
      } else {
        alert(errorMessage);
      }

      // Form sudah ter-populate karena state tidak di-reset
      // Data tetap ada di state (description, code, rateEuro, datePaid, categoryBoxes)
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/transactions");
  };

  if (loadingData) {
    return (
      <div className="p-6">
        <div className="text-center py-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">EDIT DATA TRANSAKSI</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="rateEuro">Rate Euro</Label>
            <Input
              id="rateEuro"
              value={rateEuro}
              onChange={(e) => setRateEuro(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="datePaid">Date Paid</Label>
            <Input
              id="datePaid"
              type="date"
              value={datePaid}
              onChange={(e) => setDatePaid(e.target.value)}
              required
            />
          </div>
        </div>

        {/* DATA TRANSAKSI Container */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">DATA TRANSAKSI</h2>
          <div className="space-y-4">
            {/* Category Boxes */}
            {categoryBoxes.map((box) => (
              <Card key={box.id}>
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-lg">Category Box</CardTitle>
                    <button
                      type="button"
                      onClick={() => removeCategoryBox(box.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-48 mt-3">
                      <Label htmlFor={`category-${box.id}`}>Category</Label>
                    </div>
                    <div className="flex-1 flex gap-4">
                      <div className="flex-1">
                        <NativeSelect
                          id={`category-${box.id}`}
                          value={box.category_name}
                          onChange={(e) =>
                            updateCategoryBox(box.id, e.target.value)
                          }
                        >
                          {categories.length > 0 ? (
                            categories.map((cat) => (
                              <NativeSelectOption key={cat.id} value={cat.name}>
                                {cat.name}
                              </NativeSelectOption>
                            ))
                          ) : (
                            <>
                              <NativeSelectOption value="income">
                                Income
                              </NativeSelectOption>
                              <NativeSelectOption value="expense">
                                Expense
                              </NativeSelectOption>
                            </>
                          )}
                        </NativeSelect>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nama Transaksi</TableHead>
                              <TableHead>Nominal (IDR)</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {box.items.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <Input
                                    value={item.name}
                                    onChange={(e) =>
                                      updateItemInBox(
                                        box.id,
                                        item.id,
                                        "name",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Nama Transaksi"
                                  />
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      value={item.value_idr}
                                      onChange={(e) =>
                                        updateItemInBox(
                                          box.id,
                                          item.id,
                                          "value_idr",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Nominal"
                                    />
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="ghost"
                                      onClick={() =>
                                        removeItemFromBox(box.id, item.id)
                                      }
                                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => addItemToBox(box.id)}
                          className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Plus className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}

            {/* Tombol Tambah Category Box */}
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={addCategoryBox}
                variant="default"
                className="w-auto"
              >
                Tambah
              </Button>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end mt-6">
          <Button
            type="button"
            variant="destructive"
            onClick={handleCancel}
            disabled={loading}
          >
            Batal
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Mengupdate..." : "Simpan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
