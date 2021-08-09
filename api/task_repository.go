package main

type TaskRepository struct {
	*SqlHandler
}

func (repo *TaskRepository) findAll(userId uint32) (tasks []Task, err error) {
	query := "SELECT id, user_id, title, created_at, updated_at FROM tasks WHERE user_id = ?"
	rows, err := repo.SqlHandler.Query(query, userId)
	if err != nil {
		return tasks, err
	}

	for rows.Next() {
		t := Task{}
		err := rows.Scan(&t.Id, &t.UserId, &t.Title, &t.CreatedAt, &t.UpdatedAt)
		if err != nil {
			continue
		}
		tasks = append(tasks, t)
	}

	return
}
