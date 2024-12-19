import { useRouter } from "next/router";
import EditTaskForm from "../../../components/tasks/EditTaskForm";
import TaskService from "../../../services/TaskService";

const EditTaskById: React.FC = () => {
  const router = useRouter();
  const { taskId } = router.query;
  const getTaskById = async () => {
    //   const taskResponse = await TaskService.getTaskById(taskId as String)
  };
  return (
    <>
      {
        // <EditTaskForm task={taskResponse}></EditTaskForm>
      }
    </>
  );
};
export default EditTaskById;
