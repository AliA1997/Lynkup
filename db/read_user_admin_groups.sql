SELECT groups.*, users.username FROM groups JOIN users ON groups.group_admin = users.id WHERE groups.group_admin = $1;