package main

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
