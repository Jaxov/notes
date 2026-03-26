// src/api/http.js
export async function request(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s таймаут

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const err = new Error(`HTTP_${res.status}`);
      err.status = res.status;
      err.body = text;
      throw err;
    }
    // JSON
    const ct = res.headers.get("content-type") || "";
    return ct.includes("application/json") ? res.json() : res.text();
  } catch (e) {
    if (e.name === "AbortError") throw { kind: "timeout" };
    // TypeError у fetch = сеть/CORS
    if (e instanceof TypeError) throw { kind: "network" };
    if (e.status) throw { kind: "http", status: e.status, body: e.body };
    throw { kind: "unknown", original: e };
  } finally {
    clearTimeout(timeout);
  }
}
