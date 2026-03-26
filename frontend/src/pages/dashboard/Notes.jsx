import { useEffect, useState } from "react";
import { getNotes, deleteNotes, putNotes, createNote } from "../../api/notes";
import NoteCard from "../../components/NoteCard";
import NoteForm from "../../components/NoteForm";
import { AnimatePresence, motion } from "framer-motion";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import EmptyState from "../../components/EmptyState";
export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [parent] = useAutoAnimate({ duration: 300 });

    useEffect(() => {
        getNotes().then(setNotes);
    }, []);

    function handleDelete(id) {
        setNotes(prev => prev.filter(n => n.id !== id));
        deleteNotes(id).catch(() => {
            alert("Ошибка удаления");
            getNotes().then(setNotes); // восстановить состояние при ошибке
        });
    }

    function handleCreate(data) {
        createNote(data)
            .then(newNote => setNotes(prev => [...prev, newNote]))
            .catch(() => alert("Ошибка создания"));
    }

    function handleUpdate(updatedNote) {
        putNotes(updatedNote.id, {
            title: updatedNote.title,
            content: updatedNote.content
        }).then(() => {
            setNotes(prev =>
                prev.map(note => note.id === updatedNote.id ? { ...note, ...updatedNote } : note)
            );
        }).catch(() => alert("Ошибка обновления"));
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-6 py-6 bg-[#0B0B0B] "
        >
            <motion.h1
                className="text-3xl font-bold text-[#95DBFF] mb-6"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring" }}
            >
                Твои заметки
            </motion.h1>

            <NoteForm create={handleCreate} />

            <motion.div
                ref={parent}
                className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                layout
            >
                {notes.length === 0 ? (
                    <EmptyState />
                ) : (
                    <AnimatePresence>
                        {notes.map(note => (
                            <NoteCard key={note.id} note={note} onDelete={handleDelete} onUpdate={handleUpdate} />
                        ))}
                    </AnimatePresence>
                )}
            </motion.div>
        </motion.div>
    );
}