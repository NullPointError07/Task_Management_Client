import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useGetUserID, useGetUserName } from "../CustomHook/useUserInfo";

const NewTask = () => {
  const userID = useGetUserID();
  const username = useGetUserName();

  const [taskData, setTaskData] = useState({
    tasks_name: "",
    tasks_description: "",
    assignee: username,
    due_date: "",
    status: "",
    comments: "", // Correct the typo here
    userOwner: userID,
  });

  const statusOptions = ["Not Started", "In Progress", "Completed"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://task-manager-server-amber-six.vercel.app/dashboard",
        taskData
      );
      Swal.fire("Task Created Successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="tasks_name"
          >
            Task Name:
          </label>
          <input
            className="input input-bordered w-full"
            id="tasks_name"
            type="text"
            name="tasks_name"
            value={taskData.tasks_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="tasks_description"
          >
            Task Description:
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            id="tasks_description"
            name="tasks_description"
            value={taskData.tasks_description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="due_date"
          >
            Due Date:
          </label>
          <input
            className="input input-bordered w-full"
            id="due_date"
            type="date"
            name="due_date"
            value={taskData.due_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="status"
          >
            Status:
          </label>
          <select
            className="select select-bordered w-full"
            id="status"
            name="status"
            value={taskData.status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Status</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="comments"
          >
            Comments:
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            id="comments"
            name="comments"
            value={taskData.comments}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button className="btn btn-primary" type="submit">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTask;
