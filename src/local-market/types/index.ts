export interface User {
  id: number;
  name: string;
  email: string;
  role: "member" | "admin";
  reputation?: number;
}

export interface Item {
  id: number;
  owner_id: number;
  title: string;
  description?: string;
  category?: string;
  condition?: string;
  status: "available" | "trading" | "sold";
  owner_name: string;
  created_at: string;
}

export interface Trade {
  id: number;
  item_id: number;
  requester_id: number;
  status: "created" | "negotiating" | "accepted" | "completed" | "cancelled";
  title?: string;
  created_at: string;
}

export interface Message {
  id: number;
  trade_id: number;
  sender_id: number;
  sender_name?: string;
  content: string;
  created_at: string;
}
