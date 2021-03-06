import {ParameterValidator} from "../../parameters/parameter-validator";

/**
 * Validator implementation for the HelloWorld example.
 */
export class HelloWorldValidatorImpl implements ParameterValidator<string, null, null> {

    validate(value: string): boolean {
        return value != null && value.trim().length > 0;
    }

    description(): string {
        return 'The value should not be null or empty and contain a string.';
    }
}