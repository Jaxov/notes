import { useState } from "react";

export default function NoteForm({ create }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return; // не даем создать пустую заметку
    create({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <div className="p-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-md flex flex-col  mb-4">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Заголовок заметки"
        className="rounded-lg px-3 py-2 bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-gray-100 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Текст заметки"
        className="rounded-lg px-3 py-2 bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-gray-100 resize-y min-h-[60px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        onClick={handleSubmit}
        className="self-end px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-medium transition-colors duration-200"
      >
        ➕ Создать
      </button>
    </div>
  );
}
