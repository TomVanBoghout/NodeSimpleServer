import {Parameter} from "./parameters/parameter";

/**
 * Generic EndPoint class.
 *
 * This class represents an Endpoint where the T, P, Q generic parameters are the potential types for the parameters.
 * If you only need one type, provide the other generics as null.
 * If you do not need any parameters you can pass null to all of the generic parameters.
 */
export class EndPoint<T, P, Q> {

    public path: string                             = null;
    private executor: Function                      = null;
    public parameters: Array<Parameter<T, P, Q>>    = null;

    /**
     * Constructor for Endpoint.
     *
     * @param path The path of the endpoint.
     * @param executor The executor function that will be executed when the endpoint is executed.
     * @param parameters An array containing the parameters with the provided generic types.
     */
    constructor(path: string, executor: Function, parameters: Array<Parameter<T, P, Q>>) {
        this.path = path;
        this.executor = executor;
        this.parameters = parameters != null ? parameters : [];
    }

    /**
     * Executes the endpoint by calling the executor function.
     *
     * @param request The HTTP Request.
     * @param response The HTTP Response.
     */
    public execute(request, response): void {
        this.executor(request, response, this.parameters);
    }
}