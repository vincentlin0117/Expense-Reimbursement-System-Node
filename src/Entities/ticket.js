class Ticket {
    #id;
    #resolver;
    #author;
    #description;
    #type;
    #amount;
    #status;

    constructor(id, resolver, author, description, type, amount, status) {
        this.#id = id;
        this.#resolver = resolver;
        this.#author = author;
        this.#description = description;
        this.#type = type;
        this.#amount = amount;
        this.#status = status;
    }

    get id() {
        return this.#id;
    }

    set id(newId) {
        this.#id = newId;
    }

    get resolver() {
        return this.#resolver;
    }

    set resolver(newResolver) {
        this.#resolver = newResolver;
    }

    get author() {
        return this.#author;
    }

    set author(newAuthor) {
        this.#author = newAuthor;
    }

    get description() {
        return this.#description;
    }

    set description(newDescription) {
        this.#description = newDescription;
    }

    get type() {
        return this.#type;
    }

    set type(newType) {
        this.#type = newType;
    }

    get amount() {
        return this.#amount;
    }

    set amount(newAmount) {
        this.#amount = newAmount;
    }

    get status() {
        return this.#status;
    }

    set status(newStatus) {
        this.#status = newStatus;
    }
}