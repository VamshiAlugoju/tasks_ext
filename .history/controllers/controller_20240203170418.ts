import { Request, Response } from "express";
import taskModel, { taskT } from "../models/task";

export async function getTasks(req: Request, res: Response) {
  try {
    const tasks = await taskModel.find();
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json(err);
  }
}

export async function addItem(req: Request, res: Response) {
  try {
    console.log(req.body);
    // let {name, description} = req.body;
    let objCreate: taskT = {
      tName: req.body.name,
      tDescription: req.body.description,
    };
    const task = await taskModel.create(objCreate);
    res.status(200).send("task created");
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function deleteItem(req: Request, res: Response) {
  try {
    const taskName = req.body.item ? req.body.item : null;
    const taskToDelete = await taskModel.findOne({ tName: taskName });
    if (taskToDelete && taskName) {
      await taskModel.deleteOne({ tName: taskName });
      return res.status(200).send("task deleted");
    } else {
      return res.status(200).send("No task found");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}

export async function updateItem(req: Request, res: Response) {
  try {
    const body = req.body;

    const objUpdate: taskT = {
      tName: body.name,
      tDescription: body.description,
    };
    const taskToUpdate = await taskModel.findOne({ tName: body?.search?.name });
    if (taskToUpdate) {
      await taskModel.updateOne({ tName: body?.search?.name }, objUpdate);
      return res.status(200).send("updated successfully");
    } else {
      return res.status(200).send("task not found");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}

export async function editItem(req: Request, res: Response) {
  try {
    const { name } = req.query;
    const body = req.body;
    const objUpdate: { [key: string]: string } = {};
    let taskToUpdate = await taskModel.findOne({ tName: body?.search?.name });
    if (taskToUpdate && body.data) {
      Object.keys(body.data).forEach((key) => {
        objUpdate[key] = body.data[key];
      });
      console.log(objUpdate);
      await taskModel.updateOne({ tName: body?.search?.name }, objUpdate);
      return res.send("edited task");
    } else {
      return res.send("task not found");
    }
  } catch (err) {
    return res.json(err);
  }
}

export async function haHa(req: Request) {
  try {
    const ab = req.body;
  } catch (err) {
    console.log(err);
  }
}
