"use client";

import { useEffect, useState } from "react";
import { BarChart3, Download, LogOut, PackagePlus, Search } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { useAdminToken } from "@/hooks/use-admin-token";
import { partCategories } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type ApiList = { items: any[] };

export function AdminConsole() {
  const { token, setToken, clearToken } = useAdminToken();
  const [login, setLogin] = useState({ username: "admin", password: "" });
  const [dashboard, setDashboard] = useState<any>(null);
  const [parts, setParts] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const auth = { Authorization: `Bearer ${token}` };

  async function load() {
    if (!token) return;
    const [d, p, b, e, r, c] = await Promise.all([
      fetch("/api/dashboard", { headers: auth }).then((x) => x.json()),
      fetch("/api/parts", { headers: auth }).then((x) => x.json()),
      fetch("/api/bookings", { headers: auth }).then((x) => x.json()),
      fetch("/api/enquiries", { headers: auth }).then((x) => x.json()),
      fetch("/api/reviews", { headers: auth }).then((x) => x.json()),
      fetch("/api/customers", { headers: auth }).then((x) => x.json())
    ]);
    if (d.message) {
      toast.error("Please login again.");
      clearToken();
      return;
    }
    setDashboard(d);
    setParts((p as ApiList).items ?? []);
    setBookings((b as ApiList).items ?? []);
    setEnquiries((e as ApiList).items ?? []);
    setReviews((r as ApiList).items ?? []);
    setCustomers((c as ApiList).items ?? []);
  }

  useEffect(() => { load(); }, [token]);

  async function submitLogin(event: React.FormEvent) {
    event.preventDefault();
    const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(login) });
    const data = await res.json();
    if (!res.ok) return toast.error(data.message ?? "Login failed");
    setToken(data.token);
    toast.success("Admin login successful.");
  }

  async function addPart(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = Object.fromEntries(form);
    const res = await fetch("/api/parts", { method: "POST", headers: { "Content-Type": "application/json", ...auth }, body: JSON.stringify({ ...body, images: [] }) });
    if (!res.ok) return toast.error("Part could not be saved.");
    toast.success("Part added.");
    event.currentTarget.reset();
    load();
  }

  async function patch(path: string, body: Record<string, string>) {
    const res = await fetch(path, { method: "PATCH", headers: { "Content-Type": "application/json", ...auth }, body: JSON.stringify(body) });
    if (!res.ok) return toast.error("Update failed.");
    toast.success("Updated.");
    load();
  }

  if (!token) {
    return (
      <section className="container-pad flex min-h-[70vh] items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader><CardTitle>Admin Login</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={submitLogin} className="grid gap-4">
              <Input value={login.username} onChange={(e) => setLogin({ ...login, username: e.target.value })} placeholder="Username" />
              <Input type="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} placeholder="Password from environment" />
              <Button>Login Securely</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    );
  }

  const chartData = dashboard ? Object.entries(dashboard.inventoryByCategory ?? {}).map(([name, quantity]) => ({ name, quantity })) : [];

  return (
    <section className="bg-muted/40 py-8">
      <div className="container-pad space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><h1 className="text-3xl font-bold">Admin Dashboard</h1><p className="text-sm text-muted-foreground">Operations, inventory, bookings, enquiries, reviews, and settings.</p></div>
          <Button variant="outline" onClick={clearToken}><LogOut size={16} /> Logout</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[
            ["Customers", dashboard?.customers],
            ["Bookings", dashboard?.bookings],
            ["Enquiries", dashboard?.enquiries],
            ["Parts", dashboard?.parts],
            ["Low Stock", dashboard?.lowStock],
            ["Inventory Value", dashboard?.monthlyRevenue]
          ].map(([label, value]) => <Card key={label as string}><CardHeader className="p-4"><CardTitle className="text-sm">{label}</CardTitle></CardHeader><CardContent className="px-4 pb-4 text-2xl font-bold">{value ?? "..."}</CardContent></Card>)}
        </div>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 size={18} /> Inventory Chart</CardTitle></CardHeader>
          <CardContent className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="quantity" fill="#c5162e" /></BarChart></ResponsiveContainer></CardContent>
        </Card>
        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><PackagePlus size={18} /> Add Part</CardTitle></CardHeader>
            <CardContent><form onSubmit={addPart} className="grid gap-3"><Input name="name" placeholder="Name" required /><Input name="partNumber" placeholder="Part Number" required /><Select name="category">{partCategories.map((c) => <option key={c}>{c}</option>)}</Select><Textarea name="description" placeholder="Description" required /><Input name="price" type="number" placeholder="Price" required /><Input name="quantity" type="number" placeholder="Quantity" required /><Button>Add Part</Button></form></CardContent>
          </Card>
          <ManagementTable title="Parts Management" rows={parts} columns={["name", "partNumber", "category", "price", "quantity"]} />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <StatusTable title="Bookings Management" rows={bookings} path="bookings" statuses={["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"]} patch={patch} exportPath="/api/bookings?export=csv" />
          <StatusTable title="Enquiry Management" rows={enquiries} path="enquiries" statuses={["Pending", "Contacted", "Available", "Not Available", "Completed"]} patch={patch} exportPath="/api/enquiries?export=csv" />
          <StatusTable title="Review Management" rows={reviews} path="reviews" statuses={["Pending", "Approved", "Rejected"]} patch={patch} />
          <ManagementTable title="Customer Management" rows={customers} columns={["name", "mobileNumber"]} />
        </div>
      </div>
    </section>
  );
}

function ManagementTable({ title, rows, columns }: { title: string; rows: any[]; columns: string[] }) {
  return <Card><CardHeader><CardTitle className="flex items-center gap-2"><Search size={18} /> {title}</CardTitle></CardHeader><CardContent className="overflow-x-auto"><table className="w-full text-sm"><thead><tr>{columns.map((c) => <th key={c} className="border-b p-2 text-left">{c}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row._id}>{columns.map((c) => <td key={c} className="border-b p-2">{String(row[c] ?? "")}</td>)}</tr>)}</tbody></table></CardContent></Card>;
}

function StatusTable({ title, rows, path, statuses, patch, exportPath }: { title: string; rows: any[]; path: string; statuses: string[]; patch: (path: string, body: Record<string, string>) => void; exportPath?: string }) {
  return <Card><CardHeader><CardTitle className="flex items-center justify-between gap-2">{title}{exportPath && <a href={exportPath} className="text-sm text-primary"><Download size={16} /></a>}</CardTitle></CardHeader><CardContent className="overflow-x-auto"><table className="w-full text-sm"><tbody>{rows.map((row) => <tr key={row._id}><td className="border-b p-2">{row.customerName ?? row.name}</td><td className="border-b p-2">{row.status}</td><td className="border-b p-2"><Select defaultValue={row.status} onChange={(e) => patch(`/api/${path}/${row._id}`, { status: e.target.value })}>{statuses.map((s) => <option key={s}>{s}</option>)}</Select></td></tr>)}</tbody></table></CardContent></Card>;
}
