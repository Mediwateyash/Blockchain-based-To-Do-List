// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    struct Task {
        string text;
        bool completed;
    }

    Task[] public tasks;

    event TaskCreated(uint indexed id, string text);
    event TaskToggled(uint indexed id, bool completed);

    function createTask(string calldata text) external {
        tasks.push(Task(text, false));
        emit TaskCreated(tasks.length - 1, text);
    }

    function toggleCompleted(uint id) external {
        require(id < tasks.length, "Invalid id");
        tasks[id].completed = !tasks[id].completed;
        emit TaskToggled(id, tasks[id].completed);
    }

    function getTasksCount() external view returns (uint) {
        return tasks.length;
    }

    function getTask(uint id) external view returns (string memory, bool) {
        require(id < tasks.length, "Invalid id");
        Task storage t = tasks[id];
        return (t.text, t.completed);
    }
}