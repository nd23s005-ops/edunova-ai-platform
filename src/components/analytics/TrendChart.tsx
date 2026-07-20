import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { Card } from "@/components/ui/card";

export type TrendPoint = { date: string; value: number };

export function TrendChart({ title, data, kind = "line", height = 220 }: { title?: string; data: TrendPoint[]; kind?: "line" | "bar"; height?: number }) {
  return (
    <Card className="p-4">
      {title ? <div className="text-sm font-medium mb-2">{title}</div> : null}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          {kind === "line" ? (
            <LineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="date" fontSize={11} tickFormatter={(d) => d.slice(5)} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="date" fontSize={11} tickFormatter={(d) => d.slice(5)} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
