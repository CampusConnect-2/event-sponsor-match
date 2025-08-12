import { useLocalStorage } from "@/hooks/useLocalStorage";

export function useSavedEvents() {
  const [savedIds, setSaved] = useLocalStorage<string[]>("cc_saved", []);
  const toggleSaved = (id: string) => {
    setSaved((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  };
  return { savedIds, toggleSaved };
}
