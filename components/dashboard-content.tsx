"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, Filter, Plus } from "lucide-react";
import LanguageSelector from '@/components/language-selector';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface DataItem {
  id: number;
  name: string;
  category: string;
  status: string;
  value: string;
}

export default function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formValue, setFormValue] = useState("");
  const [data, setData] = useState<DataItem[]>([
    { id: 1, name: "Item Alpha", category: "Technology", status: "Active", value: "$1,200" },
    { id: 2, name: "Item Beta", category: "Finance", status: "Pending", value: "$850" },
    { id: 3, name: "Item Gamma", category: "Marketing", status: "Active", value: "$2,100" },
    { id: 4, name: "Item Delta", category: "Technology", status: "Inactive", value: "$450" },
    { id: 5, name: "Item Epsilon", category: "Finance", status: "Active", value: "$3,200" },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // supported locales — keep in sync with next-intl.config.ts
  const locales = ["en", "fr", "ar"];

  const currentLocale = (() => {
    const segs = (pathname || '/').split('/').filter(Boolean);
    if (segs.length > 0 && locales.includes(segs[0])) return segs[0];
    return 'en';
  })();

  const changeLocale = (locale: string) => {
    // Keep the rest of the path the same but replace or add the locale prefix
    const segs = (pathname || '/').split('/').filter(Boolean);
    if (segs.length > 0 && locales.includes(segs[0])) segs[0] = locale;
    else segs.unshift(locale);
    const newPath = '/' + segs.join('/');
    const search = searchParams?.toString();
    router.push(newPath + (search ? `?${search}` : ''));
  };

  // Demo line chart data (could be derived dynamically)
  const lineData = [
    { month: "Jan", value: 1200 },
    { month: "Feb", value: 1600 },
    { month: "Mar", value: 900 },
    { month: "Apr", value: 2000 },
    { month: "May", value: 1500 },
    { month: "Jun", value: 2300 },
  ];

  // Pie chart - compute category distribution from current data
  const pieData = Object.entries(
    data.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const pieColors = ["#35B9F4", "#F02CB9", "#F59E0B", "#10B981"];

  const filteredData = data.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: DataItem = {
      id: data.length + 1,
      name: formName,
      category: formCategory,
      status: "Active",
      value: formValue,
    };
    setData([...data, newItem]);
    setFormName("");
    setFormCategory("");
    setFormValue("");
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="flex-1 bg-gray-50 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
              <p className="text-gray-600">Manage and monitor your data</p>
            </div>

            <div>
              <LanguageSelector />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="text-gray-400 w-5 h-5" />
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-[#F02CB9] to-[#35B9F4] hover:opacity-90 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Item</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Enter item name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={formCategory} onValueChange={setFormCategory} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="value">Value</Label>
                        <Input
                          id="value"
                          value={formValue}
                          onChange={(e) => setFormValue(e.target.value)}
                          placeholder="Enter value (e.g., $1,000)"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#F02CB9] to-[#35B9F4] hover:opacity-90 text-white"
                      >
                        Submit
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-md border p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Overview</h3>
                <ChartContainer
                  id="overview-line"
                  config={{ value: { label: "Amount", color: "#35B9F4" } }}
                  className="h-48"
                >
                  <LineChart data={lineData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--color-value)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>

              <div className="bg-white rounded-md border p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">By Category</h3>
                <ChartContainer id="category-pie" config={{}} className="h-48">
                  <PieChart>
                    <RechartsTooltip content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      innerRadius={28}
                      paddingAngle={4}
                      label={({ name }) => name}
                    >
                      {pieData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">ID</TableHead>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                              }`}
                          >
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell>{item.value}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                        No items found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
