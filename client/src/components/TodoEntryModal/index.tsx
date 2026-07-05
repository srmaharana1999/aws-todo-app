import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TodoEntryForm from "./TodoEntryFrom";

const TodoEntryModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className={`absolute z-10 inset-0 ${
        showModal
          ? "backdrop-blur-sm pointer-events-auto"
          : "pointer-events-none"
      } transition-transform ease-in-out duration-700`}
    >
      <button
        onClick={() => setShowModal((pre) => !pre)}
        className="absolute z-20 bottom-4 right-4 h-12 w-12 flex items-center justify-center rounded-full bg-radial from-violet-800 to-blue-800 shadow-[0px_0px_10px_5px_rgba(0,0,200,0.3)] pointer-events-auto"
      >
        <FaPlus
          size={24}
          className={`transition-transform duration-300 ${
            showModal ? "rotate-45 text-red-500" : "text-white"
          }`}
        />
      </button>
      {showModal && (
        <div className="inset-0 absolute flex items-center justify-center pointer-events-auto">
          <TodoEntryForm />
        </div>
      )}
    </div>
  );
};

export default TodoEntryModal;
