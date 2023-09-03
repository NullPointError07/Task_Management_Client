import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const TaskDetails = () => {
  const [comment, setComment] = useState("");

  const task = useLoaderData();
  console.log(task);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const formatDate = (date) => {
    const newDate = date.split("-");
    return newDate[2] + "-" + newDate[1] + "-" + newDate[0];
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="card w-auto bg-base-100 shadow-xl mt-10">
        <div className="card-body">
          <h2 className="card-title text-2xl font-semibold">
            {task.tasks_name}
          </h2>

          <p className="mb-4 font-semibold text-lg ">
            Description:{" "}
            <span className="text-gray-500">{task.tasks_description}</span>
          </p>

          <p className="mb-4 font-semibold text-lg">
            Status: <span className="text-blue-500">{task.status}</span>
          </p>

          <p className="mb-4 font-semibold text-lg">
            Due Date:{" "}
            <span className="text-red-500">
              {formatDate(task.due_date.split("T")[0])}
            </span>
          </p>

          <p className="mb-4 font-semibold text-lg">
            Assigned By: <span className="text-green-500">{task.assignee}</span>
          </p>

          <div className="mb-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded resize-none"
              rows="4"
              placeholder="Enter your comment here..."
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
          </div>

          <div className="text-center">
            <button className="btn btn-primary">Submit Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
