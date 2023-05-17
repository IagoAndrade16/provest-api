import { ValidationError } from "yup";

export class ValidationsUtils {
  static formatYupErrors(err: ValidationError): object {
    return err.inner.reduce(
      (acc, err) => ({ ...acc, [err.path as string]: err.message }),
      {}
    );
  }

  static validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
  }
}
