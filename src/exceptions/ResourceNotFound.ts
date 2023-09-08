export default class ResourceNotFound extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ResourceNotFound";
        Object.setPrototypeOf(this, ResourceNotFound.prototype)
    }
}