import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface UseSiteSettingsReturn {
  settings: Record<string, string>;
  loading: boolean;
}

export function useSiteSettings(): UseSiteSettingsReturn {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from("site_settings").select("*");
      const map: Record<string, string> = {};
      (data ?? []).forEach((r: { key: string; value: string | null }) => {
        if (r.value !== null) map[r.key] = r.value;
      });
      setSettings(map);
      setLoading(false);
    }
    fetch();
  }, []);

  return { settings, loading };
}