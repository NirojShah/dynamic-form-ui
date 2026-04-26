const BASE_URL = import.meta.env.VITE_FORMS_API;

// ─── Helper to build headers ────────────────────────────────────────────────
const buildHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

// ─── Helper to handle response ──────────────────────────────────────────────
const handleResponse = async (res) => {
  const data = await res.json();

  if (!res.ok) {
    throw {
      status: res.status,
      message: data.message || "Something went wrong",
      data,
    };
  }

  return data;
};

// ─── Common Fetch Config ────────────────────────────────────────────────────
const commonConfig = {
  credentials: "include",
};

// ─── GET ────────────────────────────────────────────────────────────────────
const get = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: buildHeaders(),
    ...commonConfig,
  });

  return handleResponse(res);
};

// ─── POST ───────────────────────────────────────────────────────────────────
const post = async (endpoint, body = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(body),
    ...commonConfig,
  });

  return handleResponse(res);
};

// ─── PUT ────────────────────────────────────────────────────────────────────
const put = async (endpoint, body = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: buildHeaders(),
    body: JSON.stringify(body),
    ...commonConfig,
  });

  return handleResponse(res);
};

// ─── PATCH ──────────────────────────────────────────────────────────────────
const update = async (endpoint, body = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: buildHeaders(),
    body: JSON.stringify(body),
    ...commonConfig,
  });

  return handleResponse(res);
};

// ─── DELETE ────────────────────────────────────────────────────────────────
const del = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: buildHeaders(),
    ...commonConfig,
  });

  return handleResponse(res);
};

const methods = {
  get,
  post,
  put,
  update,
  del,
};

export default methods;
