class User{
    #id;
    #name;
    #username;
    #password;
    #role;

    constructor(id, name, username, password, role) {
        this.#id = id;
        this.#name = name;
        this.#username = username;
        this.#password = password;
        this.#role = role;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }
    set name(newName) {
        this.#name = newName;
    }
    get username() {
        return this.#username;
    }
    set username(newUsername) {
        this.#username = newUsername;
    }
    get password() {
        return this.#password;
    }
    set password(newPassword) {
        this.#password = newPassword;
    }
    get role() {
        return this.#role;
    }
    set role(newRole) {
        this.#role = newRole;
    }

}