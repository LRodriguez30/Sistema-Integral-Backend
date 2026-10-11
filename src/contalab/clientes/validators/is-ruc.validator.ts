import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments
} from 'class-validator';

export function IsRUC(
    validationOptions?: ValidationOptions
) {
    return function (
        object: object,
        propertyName: string
    ) {
        registerDecorator({
            name: 'isRUC',

            target: object.constructor,

            propertyName,

            options: validationOptions,

            validator: {

                validate(
                    value: unknown,
                    _args: ValidationArguments
                ): boolean {

                    if (typeof value !== 'string') {
                        return false;
                    }

                    return /^\d{14}$/.test(value);

                },

                defaultMessage(
                    _args: ValidationArguments
                ): string {

                    return 'El RUC debe contener exactamente 14 dígitos.';

                }

            }

        });
    };
}