import { IValidationErrorMessage } from "form-runner";
import { AbstractControl, ValidatorFunction } from "./ValidatorFunction";
import * as Yup from "yup";
import { IYupValidationMessage } from "../yup/IYupValidationErrorMessage";

function App() {

    
    
    
    
    /*
      .test("0001-B", function (item) {
        if (!item || item.length < 4) {
          return this.createError({
            message: {
              key: this.path,
              message: "Firstname min length is 4 characters.",
              errorCode: "0001"
            } as Yup.Message<IYupValidationErrorMessage>
          });
        }
        return true;
      })
      .validateAt("name.firstname", control.value)
      .then(_ => [])
      .catch(err => {
        return err.errors as IYupValidationErrorMessage[];
      });
  }
}

export function lastNameValidator(): ValidatorFunction {
  return <DType, T>(control: AbstractControl<DType, T>): Promise<IValidationErrorMessage[]> => {
    return Yup.string().defined()
      .test("0002", function (item) {
        if (!item) {
          return this.createError({
            message: {
              key: this.path,
              message: "Lastname not provided.",
              errorCode: "0002"
            } as Yup.Message<IYupValidationErrorMessage>
          });
        }
        return true;
      })
      .validateAt("name.lastname", control.value)
      .then(_ => [])
      .catch(err => {
        return err.errors as IYupValidationErrorMessage[];
      });
  }
}

export function addressValidator(): ValidatorFunction {
  return <DType, T>(control: AbstractControl<DType, T>): Promise<IValidationErrorMessage[]> => {
    return Yup.string().defined()
      .test("0004", function (item) {
        if (!item) {
          return this.createError({
            message: {
              key: this.path,
              message: "Address Not provided",
              errorCode: "0004"
            } as Yup.Message<IYupValidationErrorMessage>
          });
        }
        return true;
      })
      .validateAt("address", control.value)
      .then(_ => [])
      .catch(err => {
        return err.errors as IYupValidationErrorMessage[];
      });
  }
}

export function rolesValidator(): ValidatorFunction {
  return <DType, T>(control: AbstractControl<DType, T>): Promise<IValidationErrorMessage[]> => {
    return Yup.string().defined()
      .test("0003", function (item) {
        if (!item.length) {
          return this.createError({
            message: {
              key: this.path,
              message: "Atleast once role must be provided",
              errorCode: "0003"
            } as Yup.Message<IYupValidationErrorMessage>
          });
        }
        return true;
      })
      .validateAt("path", control.value)
      .then(_ => [])
      .catch(err => {
        return err.errors as IYupValidationErrorMessage[];
      });
  }

*/

}

