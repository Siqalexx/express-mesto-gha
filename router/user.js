const userRouter = require("express").Router();
const {
  getUsers,
  getUser,
  setUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/user");
userRouter.get("/users", getUsers);
userRouter.get("/users/:userId", getUser);
userRouter.post("/users", setUser);
userRouter.patch("/users/me", updateProfile);
userRouter.patch("/users/me/avatar", updateAvatar);
module.exports = userRouter;
