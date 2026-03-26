import { apiRequest } from "./api"

const BASE_URL = "http://localhost:8000/notifications"

// получить список уведомлений
export async function getNotifications(onlyUnread = false) {
  const query = onlyUnread ? "?only_unread=true" : ""
  return await apiRequest(`${BASE_URL}${query}`)
}

// создать уведомление
export async function createNotification(data) {
  return await apiRequest(`${BASE_URL}/`, "POST", data)
}

// отметить уведомление как прочитанное
export async function markNotificationAsRead(id) {
  return await apiRequest(`${BASE_URL}/${id}/read`, "PATCH")
}

// удалить уведомление
export async function deleteNotification(id) {
  return await apiRequest(`${BASE_URL}/${id}`, "DELETE")
}
