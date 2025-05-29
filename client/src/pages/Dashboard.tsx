import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { DataTable } from "@/components/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import z from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.object({ city: z.string() }),
  company: z.object({ name: z.string() }),
});

const userColumns: ColumnDef<z.infer<typeof userSchema>>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "address.city", header: "City" },
  { accessorKey: "company.name", header: "Company Name" },
];

export default function Dashboard() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3001/api/proxy/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={isLoading ? [] : users} columns={userColumns} />
    </>
  );
}
