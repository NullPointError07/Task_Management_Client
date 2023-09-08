import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import NewTask from "../Components/NewTask";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskField, setTaskField] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedDueDate, setSelectedDueDate] = useState("");
  const [sortByDueDate, setSortByDueDate] = useState(null);
  const [sortByPriority, setSortByPriority] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://task-manager-server-amber-six.vercel.app/dashboard",
          {
            params: {
              sortByDueDate,
              sortByPriority,
              selectedStatus,
              selectedPriority,
              selectedDueDate,
            },
          }
        );
        setTasks(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [
    sortByDueDate,
    sortByPriority,
    selectedStatus,
    selectedPriority,
    selectedDueDate,
  ]);

  const formatDate = (date) => {
    const newDate = date.split("-");
    return newDate[2] + "-" + newDate[1] + "-" + newDate[0];
  };

  const openModal = (taskId) => {
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateStatus = async () => {
    if (!selectedTaskId || !selectedStatus) {
      // Handle error, show message to the user
      return;
    }

    try {
      await axios.put(
        "https://task-manager-server-amber-six.vercel.app/dashboard/update",
        {
          id: selectedTaskId,
          newStatus: selectedStatus,
        }
      );

      // Close the modal after a successful update
      closeModal();

      // Fetch the updated task list and set it in the state
      const updatedResponse = await axios.get(
        "https://task-manager-server-amber-six.vercel.app/dashboard"
      );
      setTasks(updatedResponse.data);

      // Clear selected task and status
      setSelectedTaskId(null);
      setSelectedStatus("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://task-manager-server-amber-six.vercel.app/dashboard/delete/${id}`
          );
          Swal.fire("Deleted!", "Your file has been deleted.", "success");

          // Fetch the updated task list and set it in the state
          const updatedResponse = await axios.get(
            "https://task-manager-server-amber-six.vercel.app/dashboard"
          );
          setTasks(updatedResponse.data);
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const handleTaskField = () => {
    setTaskField(!taskField);
  };

  // Function to handle sorting
  const handleSort = (sortBy, sortOrder) => {
    if (sortBy === "due_date") {
      setSortByDueDate(sortOrder);
      setSortByPriority(null); // Reset the priority sorting
    } else if (sortBy === "priority_level") {
      setSortByPriority(sortOrder);
      setSortByDueDate(null); // Reset the due date sorting
    }
  };

  const priorityOrder = {
    low: 0,
    medium: 1,
    high: 2,
  };

  const comparePriority = (a, b) => {
    const priorityA = priorityOrder[a.priority_level.toLowerCase()];
    const priorityB = priorityOrder[b.priority_level.toLowerCase()];
    return sortByPriority === "asc"
      ? priorityA - priorityB
      : priorityB - priorityA;
  };

  const sortedTasks = [...tasks]; // Create a copy of the tasks array to avoid mutating the original array

  if (sortByDueDate) {
    sortedTasks.sort((a, b) => {
      const dateA = new Date(a.due_date);
      const dateB = new Date(b.due_date);
      return sortByDueDate === "asc" ? dateA - dateB : dateB - dateA;
    });
  }

  if (sortByPriority) {
    sortedTasks.sort(comparePriority);
  }

  const filteredTasks = sortedTasks.filter((task) => {
    return (
      (selectedStatus === "" || task.status === selectedStatus) &&
      (selectedPriority === "" || task.priority_level === selectedPriority) &&
      (selectedDueDate === "" || task.due_date.includes(selectedDueDate))
    );
  });

  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 mt-12">
      <div className="md:w-2/3">
        {/* Filter By Status Controls */}
        <div className="mb-4 flex space-x-2">
          <button
            onClick={() => setSelectedStatus("")}
            className={`btn ${
              selectedStatus === "" ? "btn-primary" : "btn-outline"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedStatus("Not Started")}
            className={`btn ${
              selectedStatus === "Not Started" ? "btn-primary" : "btn-outline"
            }`}
          >
            Not Started
          </button>
          <button
            onClick={() => setSelectedStatus("In Progress")}
            className={`btn ${
              selectedStatus === "In Progress" ? "btn-primary" : "btn-outline"
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setSelectedStatus("Completed")}
            className={`btn ${
              selectedStatus === "Completed" ? "btn-primary" : "btn-outline"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Sorting Buttons */}
        <div className="mb-4 flex space-x-2">
          <button
            onClick={() => handleSort("due_date", "asc")}
            className="btn btn-outline"
          >
            Sort by Due Date (Asc)
          </button>
          <button
            onClick={() => handleSort("due_date", "desc")}
            className="btn btn-outline"
          >
            Sort by Due Date (Desc)
          </button>
          <button
            onClick={() => handleSort("priority_level", "asc")}
            className="btn btn-outline"
          >
            Sort by Priority (Asc)
          </button>
          <button
            onClick={() => handleSort("priority_level", "desc")}
            className="btn btn-outline"
          >
            Sort by Priority (Desc)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <div key={task._id} className="mb-4">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h2 className="text-xl font-semibold text-gray-800">
                  {task.tasks_name}
                </h2>
                <p className="text-sm mt-2 text-gray-500">
                  Due Date: {formatDate(task.due_date.split("T")[0])}
                </p>
                <p className="my-2 font-bold">Assigned To: {task.assignedTo}</p>
                <p className="my-2 font-bold">
                  Priority: {task.priority_level}
                </p>
                <div className="flex items-center mt-4">
                  <p className="text-lg text-gray-500">
                    Status: <span className="text-blue-500">{task.status}</span>
                  </p>
                  <button
                    className="ml-2 px-3 py-1 btn btn-primary btn-xs"
                    onClick={() => openModal(task._id)}
                  >
                    Update Status
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-danger btn-sm bg-red-400"
                  >
                    DELETE
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <Link
                    to={`${task._id.toString()}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="bg-white rounded-lg p-4 shadow-md text-center">
          <button
            onClick={handleTaskField}
            className="w-full md:w-auto px-4 py-2 btn btn-primary"
          >
            Create New Task
          </button>
          {taskField && (
            <div className="mt-4">
              <NewTask />
            </div>
          )}
        </div>
      </div>

      {/* Update Status Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container bg-white w-96 mx-auto shadow-lg z-50 rounded-lg">
            <div className="modal-content py-4 px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-xl font-semibold text-gray-800">
                  Update Status
                </p>
                <button
                  onClick={closeModal}
                  className="modal-close cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
              <div className="mb-4">
                <p className="mb-2 text-gray-600">Select new status:</p>
                <select
                  className="border rounded w-full py-2 px-3"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleUpdateStatus}
                  className="btn btn-primary btn-sm mr-2"
                >
                  Update
                </button>
                <button
                  onClick={closeModal}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
