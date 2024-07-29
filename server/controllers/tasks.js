import db from "./db.js";

export const createTask = async (title, user_id) => {
  const result = await db.one(
    "insert into task (title, user_id) values (${title}, ${user_id}) returning *",
    {
      title,
      user_id,
    }
  );
  return {
    title: result.title,
    done: false,
    id: result.id,
  };
};

export const getTasks = async (user_id) => {
  const result = await db.manyOrNone(
    "select * from task where deleted_at is null and user_id = ${user_id}", { user_id }
  );
 // console.log("getTask",result)
  return result.map((task) => {
    let mappedTask = {
      id: task.id,
      title: task.title,
      done: task.status !== "active",
    }
    if (task.path) {
      mappedTask.path = task.path
    }
    return mappedTask
  });
};

export const markTaskAsDone = async (id, user_id) => {
  await db.none("update task set status = 'done' where id = ${id} and user_id =  user_id", {
    id,
    user_id
  });
  return { ok: true };
};

export const deleteTask = async (id, user_id) => {
  await db.none("update task set deleted_at = now() where id = ${id} and user_id =  user_id", {
    id,
    user_id
  });
  return { ok: true };
};

export const addImage = async (id, user_id, path) => {
  const result = await db.one("update task set path = ${path} where id = ${id} and user_id = ${user_id} returning path ", {
    id,
    user_id,
    path
  })
 // console.log("addImage",result)
  return result
}