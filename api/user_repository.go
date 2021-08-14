package main

type UserRepository struct {
	*SqlHandler
}

func (repo *UserRepository) findById(id uint32) (user User, err error) {
	query := "SELECT id, name, active FROM users WHERE id = ? LIMIT 1"
	rows, err := repo.SqlHandler.Query(query, id)
	if err != nil {
		return
	}

	for rows.Next() {
		err = rows.Scan(&user.Id, &user.Username, &user.Active)
		break
	}

	return
}
