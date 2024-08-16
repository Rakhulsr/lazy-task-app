import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

function AddTaskModal({ title, onClose, onSave, children }) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <AiOutlineClose className="h-6 w-6" />
          </button>
        </div>
        <div>{children}</div>
        <div className="mt-4 flex justify-end">
          <button onClick={onSave} className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default AddTaskModal;
