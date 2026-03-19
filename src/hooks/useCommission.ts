import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Commission } from "@/types";

type HookState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "found"; data: Commission }
  | { phase: "not_found" }
  | { phase: "error"; message: string };

interface UseCommissionReturn {
  state: HookState;
  lookup: (id: string) => Promise<void>;
  reset: () => void;
}

export function useCommission(): UseCommissionReturn {
  const [state, setState] = useState<HookState>({ phase: "idle" });
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  // Teardown any existing realtime subscription
  const teardown = useCallback(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    teardown();
    setState({ phase: "idle" });
  }, [teardown]);

  const lookup = useCallback(
    async (id: string) => {
      teardown();
      setState({ phase: "loading" });

      try {
        const { data, error } = await supabase
          .from("commissions")
          .select("*")
          .eq("id", id)
          .single();

        if (error || !data) {
          setState({ phase: "not_found" });
          return;
        }

        setState({ phase: "found", data: data as Commission });

        // ── Realtime subscription ──────────────────────────
        const channel = supabase
          .channel(`commission:${id}`)
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "commissions",
              filter: `id=eq.${id}`,
            },
            (payload) => {
              setState({
                phase: "found",
                data: payload.new as Commission,
              });
            }
          )
          .subscribe();

        channelRef.current = channel;
      } catch (err) {
        setState({
          phase: "error",
          message: err instanceof Error ? err.message : "Unexpected error.",
        });
      }
    },
    [teardown]
  );

  // Cleanup on unmount
  useEffect(() => () => teardown(), [teardown]);

  return { state, lookup, reset };
}