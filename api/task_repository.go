package main

import "time"

type TaskRepository struct {
	*SqlHandler
}

func (repo *TaskRepository) findAll(userId uint32) (tasks []Task, err error) {
	query := "SELECT id, user_id, title, created_at, updated_at FROM tasks WHERE user_id = ?"
	rows, err := repo.SqlHandler.Query(query, userId)
	if err != nil {
		return
	}

	for rows.Next() {
		t := Task{}
		err = rows.Scan(&t.Id, &t.UserId, &t.Title, &t.CreatedAt, &t.UpdatedAt)
		if err != nil {
			continue
		}
		tasks = append(tasks, t)
	}

	return
}

func (repo *TaskRepository) findById(id uint32, userId uint32) (task Task, err error) {
	query := "SELECT id, user_id, title, created_at, updated_at FROM tasks WHERE id = ? AND user_id = ? LIMIT 1"
	rows, err := repo.SqlHandler.Query(query, id, userId)
	if err != nil {
		return
	}

	for rows.Next() {
		err = rows.Scan(&task.Id, &task.UserId, &task.Title, &task.CreatedAt, &task.UpdatedAt)
		break
	}

	return
}

type TaskItem struct {
	UserId uint32
	Title  string
}

func (repo *TaskRepository) save(item TaskItem) (task Task, err error) {
	now := time.Now().Format("2006-01-02 15:04:05")

	query := "INSERT INTO tasks (user_id, title, created_at, updated_at) VALUES (?, ?, ?, ?)"
	result, err := repo.SqlHandler.Execute(query, item.UserId, item.Title, now, now)
	if err != nil {
		return
	}

	id64, err := result.LastInsertId()
	if err != nil {
		return
	}

	task.Id = uint32(id64)
	task.UserId = item.UserId
	task.Title = item.Title
	task.CreatedAt = now
	task.UpdatedAt = now

	return
}

func (repo *TaskRepository) update(id uint32, item TaskItem) (task Task, err error) {
	task, err = repo.findById(id, item.UserId)
	if err != nil {
		return
	}

	now := time.Now().Format("2006-01-02 15:04:05")

	query := "UPDATE tasks SET title = ?, updated_at = ? WHERE id = ? AND user_id = ?"
	_, err = repo.SqlHandler.Execute(query, item.Title, now, task.Id, task.UserId)
	if err != nil {
		return
	}

	task.Title = item.Title
	task.UpdatedAt = now

	return
}

func (repo *TaskRepository) delete(id uint32, userId uint32) (err error) {
	query := "DELETE FROM tasks WHERE id = ? AND user_id = ?"
	_, err = repo.SqlHandler.Execute(query, id, userId)
	return
}
