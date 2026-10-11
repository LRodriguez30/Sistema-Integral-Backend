import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function IsCodigoProducto(
    validationOptions?: ValidationOptions,
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isCodigoProducto',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: unknown) {
                    if (typeof value !== 'string') {
                        return false;
                    }

                    return /^PROD-\d{6}$/.test(value);
                },

                defaultMessage() {
                    return 'El código del producto debe tener el formato PROD-000000';
                },
            },
        });
    };
}