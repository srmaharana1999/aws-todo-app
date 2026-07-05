export async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Request Failed!");
  }
  const { result } = await response.json();
  return result;
}
