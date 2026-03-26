// components/ui/SkeletonCard.jsx
export function SkeletonCard() {
    return (
        <div className="w-60 p-4 rounded-2xl bg-gradient-to-br from-[#1B1B1B] to-[#242424]">
            <div className="h-6 bg-gray-700 rounded mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
            <div className="flex justify-end gap-2 mt-4">
                <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
            </div>
        </div>
    );
}