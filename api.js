import { API_KEY } from "@env";

const API_URL = API_KEY;

export async function getLvlAndXp() {
  const res = await fetch(`${API_URL}/getLevelXp`, { credentials: "include" });
  return res.json();
}

export async function updateLevelAndXp(level, xp) {
  const res = await fetch(`${API_URL}/updateLevelXp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ level, xp }),
  });
  return res.json();
}

export async function getDailyTask() {
  const res = await fetch(`${API_URL}/getDailyTask`, { credentials: "include" });
  return res.json();
}

export async function completeDailyTask(taskId) {
  const res = await fetch(`${API_URL}/Dailytasks/${taskId}/complete`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({}),
  });
  return res.json();
}

export async function updateUsername(newName) {
  const res = await fetch(`${API_URL}/user/editUsername`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ newName }),
  });
  return res.json();
}

export async function deleteUser(userId) {
  const res = await fetch(`${API_URL}/user/deleteUser`, {
    method: "DELETE",
    credentials: "include",
  });
  if (res.status === 204) {
    return { success: true };
  } else {
    const data = await res.json();
    return data;
  }
}

export async function completeTask(taskId) {
  const res = await fetch(`${API_URL}/tasks/${taskId}/complete`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({}),
  });
  return res.json();
}

export async function login(username, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function register(username, password, email) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password, email }),
  });
  return res.json();
}

export async function logout() {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({}),
  });
  return res.json();
}

export async function sendEmailCode(email) {
  const res = await fetch(`${API_URL}/sendCode`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function resetPassword(email, code, newPassword) {
  const res = await fetch(`${API_URL}/changePasswd`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, code, newPassword }),
  });
  return res.json();
}

export async function addTask(title) {
  const res = await fetch(`${API_URL}/addTask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function getYourTask() {
  const res = await fetch(`${API_URL}/getYourTask`, { credentials: "include" });
  return res.json();
}

export async function getMotivation() {
  const res = await fetch(`${API_URL}/getMotivation`, { credentials: "include" });
  return res.json();
}

export async function getTopUser() {
  const res = await fetch(`${API_URL}/getTopUsers`, { credentials: "include" });
  return res.json();
}