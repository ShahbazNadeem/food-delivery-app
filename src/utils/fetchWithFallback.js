export async function fetchWithFallback(path, options = {}) {
  const base1 = process.env.NEXT_PUBLIC_API_PRIMARY;
  const base2 = process.env.NEXT_PUBLIC_API_FALLBACK;

  try {
    const res = await fetch(`${base1}${path}`, options);
    if (!res.ok) throw new Error("Primary failed");
    return res;
  } catch {
    const res = await fetch(`${base2}${path}`, options);
    if (!res.ok) throw new Error("Fallback failed");
    return res;
  }
}
