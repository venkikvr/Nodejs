import {
  FindUser,
  createUser,
  FindUserById,
  updateUser,
  deleteUser,
} from "../models/user.model.js";
import msg from "../utils/response.js";

const _createUser = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    return msg.successMsg(res, 201, user, "User added successfully !!");
  } catch (error) {
    return msg.errorMsg(res, 503, error);
  }
};
const _getAllUsers = async (req, res, next) => {
  try {
    const user = await FindUser();
    return msg.successMsg(res, 200, user, "User returned successfully !!");
  } catch (error) {
    return msg.errorMsg(res, 503, error);
  }
};

const _getUserById = async (req, res, next) => {
  try {
    const user = await FindUserById(req.params.id);
    return msg.successMsg(res, 200, user, "User returned successfully !!");
  } catch (error) {
    return msg.errorMsg(res, 503, error);
  }
};

const _updateUser = async (req, res, next) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    return msg.successMsg(res, 200, user, "User Updated successfully !!");
  } catch (error) {
    return msg.errorMsg(res, 503, error);
  }
};
const _deleteUser = async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);
    return msg.successMsg(res, 200, user, "User deleted successfully !!");
  } catch (error) {
    return msg.errorMsg(res, 503, error);
  }
};
export default {
  _createUser,
  _getAllUsers,
  _getUserById,
  _updateUser,
  _deleteUser,
};
