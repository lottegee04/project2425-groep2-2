import React, { useState } from "react";
import TaskService from "../../services/TaskService";
import { Priority } from "../../types";
import { useRouter } from "next/router";

const TaskForm: React.FC = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [sidenote, setSidenote] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<Priority>({
    levelName: "",
    colour: "",
  });
  const [userId, setUserId] = useState(1);
  const [deadlineError, setDeadlineError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];

    if (deadline < today) {
      setDeadlineError("Deadline cannot be before today.");
      return;
    } else {
      setDeadlineError("");
    }

    await TaskService.createTask({
      description,
      sidenote,
      deadline: new Date(deadline),
      priority,
      user: {id: userId},
    });
    setDescription(description);
    setSidenote(sidenote);
    setDeadline(deadline);
    setUserId(1);
    router.push("/tasks");
  };

  const handlePriorityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;

    setPriority({
      levelName: value,
      colour: getPriorityColor(value),
    });
  };

  const getPriorityColor = (level: string) => {
    switch (level) {
      case "urgent":
        return "red";
      case "neutral":
        return "yellow";
      case "basic":
        return "green";
      default:
        return "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="align-self-center d-flex flex-column p-2">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="align-self-center d-flex flex-column p-2">
        <label htmlFor="sidenote">Sidenote:</label>
        <textarea
          id="sidenote"
          name="sidenote"
          value={sidenote}
          onChange={(e) => setSidenote(e.target.value)}
        />
      </div>
      <div className="align-self-center d-flex flex-column p-2">
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={deadline.toString()}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        {deadlineError && (
          <small className="text-danger">{deadlineError}</small>
        )}
      </div>
      <div>
        <label htmlFor="priorityLevel">Priority Level:</label>
        <select
          id="priorityLevel"
          name="levelName"
          value={priority.levelName}
          onChange={handlePriorityChange}
          required
        >
          <option value="">Select priority</option>
          <option value="urgent">urgent</option>
          <option value="neutral">neutral</option>
          <option value="basic">basic</option>
        </select>
      </div>
      <button type="submit">Submit Task</button>
    </form>
  );
};

export default TaskForm;
