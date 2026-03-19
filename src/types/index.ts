import { z } from "zod";

// ── DB row ───────────────────────────────────────────────────
export type CommissionStatus = "queued" | "sketching" | "painting" | "completed";

export interface Commission {
  id: string;
  client_name: string;
  status: CommissionStatus;
  queue_pos: number;
  preview_url: string | null;
  updated_at: string;
}

// ── Status ordering / display helpers ───────────────────────
export const STATUS_STEPS: CommissionStatus[] = [
  "queued",
  "sketching",
  "painting",
  "completed",
];

export const STATUS_LABELS: Record<CommissionStatus, string> = {
  queued:    "In Queue",
  sketching: "Sketching",
  painting:  "Painting",
  completed: "Completed",
};

export const STATUS_DESCRIPTIONS: Record<CommissionStatus, string> = {
  queued:    "Your commission is confirmed and waiting in the queue.",
  sketching: "The artist is working on initial sketches and composition.",
  painting:  "Final artwork is being painted with colour and detail.",
  completed: "Your commission is complete and ready for delivery.",
};

// ── Zod validation ───────────────────────────────────────────
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const commissionIdSchema = z
  .string()
  .trim()
  .regex(UUID_REGEX, "Please enter a valid Commission ID (UUID format).");

export type CommissionIdInput = z.infer<typeof commissionIdSchema>;

// ── Gallery ──────────────────────────────────────────────────
export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  medium: string;
  year: number;
}