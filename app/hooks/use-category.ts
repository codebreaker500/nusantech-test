import { useParams } from "react-router";

export function useCategory(defaultValue = "now_playing") {
  const { category } = useParams<{ category?: string }>();
  return category ?? defaultValue;
}
