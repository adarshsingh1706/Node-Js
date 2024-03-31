const express = require("express");
const router = express.Router();
const {
  handleAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

//Routes

router.get("/", handleAllUsers);

//to get info of an id

router.get("/:id", handleGetUserById);

//to post info

router.post("/", handleCreateNewUser);

//editing using patch

router.patch("/:id", handleUpdateUserById);

//for deleting user
router.delete("/:id", handleDeleteUserById);

module.exports = router;


/*This code defines a router in an Express.js application for handling CRUD (Create, Read, Update, Delete) operations on user resources. Here's a summary of the routes and their corresponding controller functions:

1. `router.get("/", handleAllUsers);` - Route to handle GET requests for retrieving all users. It calls the `handleAllUsers` controller function.

2. `router.get("/:id", handleGetUserById);` - Route to handle GET requests for retrieving a user by their ID. It calls the `handleGetUserById` controller function.

3. `router.post("/", handleCreateNewUser);` - Route to handle POST requests for creating a new user. It calls the `handleCreateNewUser` controller function.

4. `router.patch("/:id", handleUpdateUserById);` - Route to handle PATCH requests for updating a user by their ID. It calls the `handleUpdateUserById` controller function.

5. `router.delete("/:id", handleDeleteUserById);` - Route to handle DELETE requests for deleting a user by their ID. It calls the `handleDeleteUserById` controller function.

The routes are defined using the corresponding HTTP methods (GET, POST, PATCH, DELETE) and specify the path and the controller function to be called for each route. The router is then exported for use in the main Express application. */
