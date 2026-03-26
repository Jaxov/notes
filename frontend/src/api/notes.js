import { apiRequest } from "./api";

export async function getNotes() {
  return await apiRequest('http://localhost:8000/notes')
}


export async function deleteNotes(id) {
    return await apiRequest(`http://localhost:8000/notes/${id}`, "DELETE")
}

export async function putNotes(id, data) {
    return await apiRequest(`http://localhost:8000/notes/${id}`, "PUT", data)
}

export async function createNote(data) {
    // data = { title: "...", content: "..." }
    return await apiRequest(`http://localhost:8000/notes/`, "POST", data);
}



export async function getCollections() {
    return await apiRequest('http://localhost:8000/collection/') // ← добавьте слеш в конце
}

