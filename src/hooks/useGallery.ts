import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { GalleryItem } from "@/types";

interface UseGalleryReturn {
  items: GalleryItem[];
  loading: boolean;
  error: string | null;
}

export function useGallery(): UseGalleryReturn {
  const [items,   setItems]   = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      setLoading(true);
      const { data, error: err } = await supabase
        .from("gallery_items")
        .select("*")
        .order("sort_order", { ascending: true });

      if (err) {
        setError(err.message);
      } else {
        setItems((data ?? []) as GalleryItem[]);
      }
      setLoading(false);
    }
    fetchGallery();
  }, []);

  return { items, loading, error };
}