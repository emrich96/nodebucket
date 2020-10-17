/**
 * Title: employee.js
 * Author: Emily Richter
 * Date: 28 September 2020
 * Description: APIs -- findEmployeeById, findAllTasks, createTask, updateTask, deleteTask
 */

const express = require('express');
const Employee = require('../models/employee');
const BaseResponse = require('../services/base.response');
const ErrorResponse = require('../services/error.response');

const router = express.Router();

/*
 * FindEmployees
 * Test db connection; pulls up all employees
 */
// Testing connection to database and employee connection
router.get('/', async(req, res) => {
  try {
    Employee.find({}, function(err, employees) {
      if (err) {
        console.log(err);

        res.status(500).send( {
          'message': 'Internal server error'
        })
      } else {
        console.log(employees);

        res.json(employees)
      }
    })
  } catch (e) {
    console.log(e);

    res.status(500).send( {
      'message': 'Internal server error'
    })
  }
})

/*
 * FindEmployeeById
 * Pull up employees by employeeId
 */
router.get('/:employeeId', async(req, res) => {
  try {
    /**
     * Use the mongoose employee model to query MongoDB Atlas by employeeId
     */
    Employee.findOne({ employeeId: req.params.employeeId }, function(err, employee) {
      /**
       * If there is a database level error, handle by returning a server 500 error
       */
      if (err) {
        console.log(err);

        res.status(500).send({
          'message': 'Internal server error'
        })
      } else {
        /**
         * If there are no database level errors, return employee object
         * {}
         */
        console.log(employee)

        res.json(employee)
      }
    })
  } catch (e) {
    /**
     * Catch any potential errors that we didn't prepare for
     */
    console.log(e);
    res.status(500).send({
      'message':'Internal server error!'
    })
  }
})

/**
 * Example: Custom response codes
 * request-response design pattern
 */
/*class EmployeeResponse {
  statusCode
  constructor(message, statusCode, errorMessage) {
    this.message = message;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.data = data
  }
}*/

/**
 * findAllTasks
 * maybe separate task API
 */
router.get('/:employeeId/tasks', async(req, res) => {
  try {
    //throw new Error('Testing error response')

    Employee.findOne({ 'employeeId': req.params.employeeId }, 'employeeId todo done', function(err, employee) {
      if (err) {
        console.log(err);

        const mongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(mongoDbErrorResponse.toObject())
        //const mongodbError = new EmployeeResponse('internal server error', '500', err, null)
        /*res.status(500).send({
          //data: mongodbError
        })*/
      } else {
        console.log(employee);

        const employeeTaskResponse = new BaseResponse('200', 'Query successful', employee);

        res.json(employeeTaskResponse.toObject())

        //const successResponse = new EmployeeResponse ('Your query worked', res.status, null, employee);
        //res.json(successResponse)
        //res.json(employee);
      }
    })

  } catch (e) {

    console.log(e);

    const errorCatchResponse = new ErrorResponse('500', 'Internal server error', e.message)

    res.status(500).send(errorCatchResponse.toObject())

    /*res.status(500).send({
      'message': 'Internal server error!'
    })*/
  }
})

/**
 * createTask API
 */
router.post('/:employeeId/tasks', async(req,res) => {

  try {

    Employee.findOne({'employeeId': req.params.employeeId}, function(err, employee) {
      if (err) {
        console.log(err);

        const createTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

        res.status(500).send(createTaskMongoDbErrorResponse.toObject())
      } else {
          console.log(employee);

          // Create a new item object
          const item = {
            text: req.body.text
          };

          // Push new item to todo array
          employee.todo.push(item)

          employee.save(function(err, updatedEmployee) {
            if (err) {
              console.log(err);

              const createTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

              res.status(500).send(createTaskOnSaveMongoDbErrorResponse.toObject())
            } else {
              console.log(updatedEmployee)

              const createTaskOnSaveSuccessResponse = new BaseResponse('200', 'Successful entry', updatedEmployee);

              res.json(createTaskOnSaveSuccessResponse.toObject())
            }
          })
      }
    })

  } catch (e) {
    console.log(e);

    const createTasksCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message)

    res.status(500).send(createTasksCatchErrorResponse)
  }
})

/**
 * updateTask API
 */
router.put('/:employeeId/tasks', async(req, res) => {
  try {

    Employee.findOne({'employeeId': req.params.employeeId}, function(err, employee) {
      if (err) {
        console.log(err);

        const updateTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

        res.status(500).send(updateTaskMongoDbErrorResponse.toObject)
      } else {
        console.log(employee);

        employee.set({
          todo: req.body.todo,
          done: req.body.done
        });

        employee.save(function(err, updatedEmployee) {
          if (err) {
            console.log(err);

            const updateTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

            res.status(500).send(updateTaskOnSaveMongoDbErrorResponse.toObject())
          } else {
            console.log(updatedEmployee);

            const updatedTaskOnSaveSuccessResponse = new BaseResponse('200', 'Update successful', updatedEmployee);

            res.json(updatedTaskOnSaveSuccessResponse.toObject())
          }
        })
      }
    })

  } catch (e) {
    console.log(e);

    const updateTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message)

    res.status(500).send(updateTaskCatchErrorResponse.toObject())
  }
})

/**
 * deleteTask API
 */
router.delete('/:employeeId/tasks/:taskId', async(req, res) => {
  try {

    Employee.findOne({ 'employeeId': req.params.employeeId }, function(err, employee) {
      if (err) {
        console.log(err);

        const deleteTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

        res.status(500).send(deleteTaskMongoDbErrorResponse.toObject())
      } else {
        console.log(employee);

        const toDoItem = employee.todo.find(item => item._id.toString() === req.params.taskId );
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId );

        if (toDoItem) {
          employee.todo.id(toDoItem._id).remove();
          employee.save(function(err, updatedToDoItemEmployee) {
            if (err) {
              console.log(err);

              const deleteToDoItemOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err)

              res.status(500).send(deleteToDoItemOnSaveMongoDbErrorResponse.toObject())
            } else {
              console.log (updatedToDoItemEmployee);

              const deleteToDoItemSuccessResponse = new BaseResponse('200', 'Removed item from the todo list', updatedToDoItemEmployee);

              res.json(deleteToDoItemSuccessResponse.toObject())
            }
          })
        } else if (doneItem) {
          employee.done.id(doneItem._id).remove();

          employee.save(function(err, updatedDoneItemEmployee) {
            if (err) {
              console.log(err);

              const deleteDoneOnSaveMongoDbErrorResponse = new ErrorResponse('500','Internal server error', err);

              res.status(500).send(deleteDoneOnSaveMongoDbErrorResponse.toObject())
            } else {
              console.log(updatedDoneItemEmployee);

              const deleteDoneItemSuccessResponse = new BaseResponse('200', 'Removed item from the done list', updatedDoneItemEmployee);

              res.json(deleteDoneItemSuccessResponse.toObject())
            }
          })


        } else {
          console.log('Invalid task id');

          const deleteTaskNotFoundErrorResponse = new ErrorResponse('200', 'Unable to locate the requested task', null);

          res.status(200).send(deleteTaskNotFoundErrorResponse.toObject())
        }
      }
    })

  } catch (e) {
    console.log(e);

    const deleteTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);

    res.status(500).send(deleteTaskCatchErrorResponse.toObject())
  }
})


module.exports = router;
