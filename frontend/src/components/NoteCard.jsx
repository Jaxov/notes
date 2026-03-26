import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

export default function NoteCard({ note, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(note.title);
    const [editContent, setEditContent] = useState(note.content);
    const [isHovered, setIsHovered] = useState(false);

    const handleSave = () => {
        if (editTitle.trim() && editContent.trim()) {
            onUpdate({
                id: note.id,
                title: editTitle,
                content: editContent
            });
            setIsEditing(false);
        }
    };

    return (
        <motion.div
            layout
            className="w-60 p-4 rounded-2xl shadow-lg bg-gradient-to-br from-[#1B1B1B] to-[#242424] text-white flex flex-col justify-between relative overflow-hidden"
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Glow effect */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#95DBFF] to-[#A27EFF] opacity-0 rounded-2xl"
                animate={{ opacity: isHovered ? 0.1 : 0 }}
                transition={{ duration: 0.3 }}
            />
            
            <AnimatePresence mode="wait">
                {!isEditing ? (
                    <motion.div
                        key="view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10"
                    >
                        <div className="overflow-hidden mb-2">
                            <motion.div 
                                className="font-bold text-lg truncate"
                                initial={{ color: "#ffffff" }}
                                animate={{ color: isHovered ? "#95DBFF" : "#ffffff" }}
                                transition={{ duration: 0.3 }}
                            >
                                {note.title}
                            </motion.div>
                            <div className="text-gray-400 text-sm line-clamp-3">{note.content}</div>
                        </div>
                        <motion.div 
                            className="flex gap-2 justify-end"
                            initial={{ opacity: 0.7 }}
                            animate={{ opacity: isHovered ? 1 : 0.7 }}
                        >
                            <Button 
                                className="bg-yellow-500/90 hover:bg-yellow-500 text-white px-2 py-1 rounded transition-colors"
                                onClick={() => setIsEditing(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                ✏️
                            </Button>
                            <Button 
                                className="bg-red-500/90 hover:bg-red-500 text-white px-2 py-1 rounded transition-colors"
                                onClick={() => onDelete(note.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                🗑️
                            </Button>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="edit"
                        className="flex flex-col gap-2 relative z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <input
                            type="text"
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            className="rounded-lg px-3 py-1 bg-gray-700 text-white focus:ring-2 focus:ring-[#95DBFF] outline-none transition-all"
                            placeholder="Заголовок"
                            autoFocus
                        />
                        <textarea
                            value={editContent}
                            onChange={e => setEditContent(e.target.value)}
                            className="rounded-lg px-3 py-1 bg-gray-700 text-gray-200 resize-y min-h-[60px] focus:ring-2 focus:ring-[#A27EFF] outline-none transition-all"
                            placeholder="Текст заметки"
                        />
                        <div className="flex gap-2 justify-end">
                            <Button 
                                className="bg-green-600/90 hover:bg-green-600 text-white px-2 py-1 rounded transition-colors"
                                onClick={handleSave}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                💾 Сохранить
                            </Button>
                            <Button 
                                className="bg-gray-600/90 hover:bg-gray-600 text-white px-2 py-1 rounded transition-colors"
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditTitle(note.title);
                                    setEditContent(note.content);
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                ❌ Отмена
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}