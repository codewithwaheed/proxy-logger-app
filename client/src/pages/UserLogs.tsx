import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataTable } from "@/components/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type Log = {
    method: string;
    url: string;
    timestamp: string;
    status: number;
    responseTime?: number;
    user?: {
        name: string;
        email: string;
    };
};

// Columns
const columns: ColumnDef<Log>[] = [
    { accessorKey: "method", header: "Method" },
    { accessorKey: "url", header: "URL" },
    { accessorKey: "user.email", header: "User Email" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "responseTime", header: "Response Time (ms)" },
    {
        accessorKey: "timestamp",
        header: "Time",
        cell: ({ row }) =>
            new Date(row.original.timestamp).toLocaleString("en-PK", {
                dateStyle: "short",
                timeStyle: "short",
            }),
    },
];

export default function UserLogsPage() {
    const [search, setSearch] = useState("");
    const [loggingEnabled, setLoggingEnabled] = useState(true);

    const { data: { logs, loggingConfig } = [], isLoading } = useQuery({
        queryKey: ["logs", search],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/logs`, {
                params: { search },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return res.data;
        },
    });

    useEffect(() => {
        if (!isLoading && loggingConfig) {
            setLoggingEnabled(loggingConfig?.isEnabled);
        }
    }, [loggingConfig]);

    const toggleLogging = async () => {
        setLoggingEnabled(!loggingEnabled);
        await axios.post(`${import.meta.env.VITE_API_URL}/api/logs/toggle`, {
            enabled: !loggingEnabled,
        });
    };

    return (

        <div className="flex flex-col p-4 gap-4">
            <div className="flex justify-between items-center">
                <Input
                    placeholder="Search URL or Method"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-md"
                />
                <div className="flex items-center gap-2">
                    <span>Logging</span>
                    <Switch checked={loggingEnabled} onCheckedChange={toggleLogging} />
                </div>
            </div>
            <DataTable
                data={isLoading ? [] : logs}
                columns={columns}
            />
        </div>
    );
}
