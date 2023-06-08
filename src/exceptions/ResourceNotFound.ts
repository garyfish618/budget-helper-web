export default class ResourceNotFound extends Error {
    constructor(message: string) {
        super(message);
        console.log("HERE")
        this.name = "ResourceNotFound";
        Object.setPrototypeOf(this, ResourceNotFound.prototype)
    }
}