import React, { useState } from 'react';
import TaskService from '../../services/TaskService';
import { Priority } from '../../types';


const TaskForm: React.FC = () => {
  const [description, setDescription] = useState("");
  const [sidenote, setSidenote] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority,setPriority] = useState<Priority>({levelName:"basic",colour:"green"});
  const [userId,setUserId] = useState(1);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await TaskService.createTask({description,sidenote,deadline,priority,userId})
    setDescription(description);
    setSidenote(sidenote);
    setDeadline(deadline);
    setPriority({ levelName: "basic", colour: "green" });
    setUserId(1)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='align-self-center d-flex flex-column p-2'>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange= {(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className='align-self-center d-flex flex-column p-2'>
        <label htmlFor="sidenote">Sidenote:</label>
        <textarea
          id="sidenote"
          name="sidenote"
          value={sidenote}
          onChange={(e) => setSidenote(e.target.value)}
          required
        />
      </div>
      <div className='align-self-center d-flex flex-column p-2'>
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={deadline.toString()}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Task</button>
    </form>
  );
};

export default TaskForm;