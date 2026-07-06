const TodoBarSkeleton = () => {
    return (
        <div className="min-h-16 bg-white grid grid-cols-[80px_1.5fr_0.6fr_0.4fr_80px_0.4fr_60px_60px_60px] place-items-center p-4 animate-pulse">
            <div className="h-4 w-6 rounded bg-gray-200" />
            <div className="h-5 w-40 rounded bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-6 w-16 rounded bg-gray-200" />
            <div className="h-6 w-14 rounded-full bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div className="h-8 w-8 rounded-full bg-gray-200" />
        </div>
    );
};

export default TodoBarSkeleton;