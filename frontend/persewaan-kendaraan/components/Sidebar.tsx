"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Data Transaksi",
      href: "#",
      children: [
        {
          label: "Tambah Data Transaksi",
          href: "/transactions/add",
        },
        {
          label: "List Data Transaksi",
          href: "/transactions",
        },
        {
          label: "Rekap Transaksi",
          href: "/transactions/rekap",
        },
      ],
    },
  ];

  return (
    <div
      className={cn(
        "w-64 bg-gray-50 border-r border-gray-200 h-screen p-4",
        className
      )}
    >
      <div className="space-y-4">
        {menuItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  {item.label}
                </div>
                <div className="ml-4 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md transition-colors",
                        pathname === child.href
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-200"
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "block px-3 py-2 text-sm rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                )}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
