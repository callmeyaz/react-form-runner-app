

import { minLengthValidator, requiredValidator, ValidatorFunction } from "../src/lib/ValidatorFunction";
import * as Yup from "yup";

//TControl extends {[K in keyof TControl]: AbstractControl<any>} = any,

//export const AppExsSchema: Yup.ObjectSchema<User> = Yup.object(user);



//   public array<T extends AbstractControlOptions, TVal extends { [key: string]: AbstractControlOptions}>(
//     initialValue: any[], topleveloption: T, controls?: TVal): IFormArray {
//     // T is control
//     return new FormArray();
//   }

// array: <T extends AbstractControlOptions, TVal extends { [key: string]: AbstractControlOptions}>(
//     initialValue: any[], topleveloption: T, controls?: TVal) => FormArray;





type TGroup = { [key: string]: (FieldValidationConfig | IFormGroup | IFormArray) };
type TArray = (FieldValidationConfig | TGroup);

class FieldValidationConfig {
  value: Yup.Schema = Yup.object({});
  validators: ValidatorFunction<any>[] = [];
}

interface IFormArray {
  getSchema: () => Yup.Schema
  validate: () => Promise<boolean>;
}

interface IFormGroup {
  getSchema: () => Yup.Schema
  validate: () => Promise<boolean>;
}

class FormGroup<T extends TGroup> implements IFormGroup {
  private fieldConfigs: T;

  constructor(fieldConfigs: T) {
    this.fieldConfigs = fieldConfigs;
  }

  public getSchema(): Yup.Schema {
    var schema: Yup.Schema = Yup.object({});

    Object.keys(this.fieldConfigs).forEach((fieldName) => {
      var fieldConfig = this.fieldConfigs[fieldName];

      if (fieldConfig instanceof FieldValidationConfig) {
        const rule = {} as { [key: string]: any };
        rule[fieldName] = fieldConfig.value;
        schema = Yup.object({}).shape(rule);

      } else if (fieldConfig instanceof FormGroup || fieldConfig instanceof FormArray) {
        const rule = {} as { [key: string]: any };
        rule[fieldName] = fieldConfig.getSchema();
        schema = Yup.object({}).shape(rule);
      }
    });

    return schema;
  }

  public validate(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

class FormArray<T extends TArray> implements IFormArray {
  private fieldConfig: T;

  constructor(fieldConfig: T) {
    this.fieldConfig = fieldConfig;
  }

  public getSchema(): Yup.Schema {
    var schema: Yup.Schema = Yup.object();

    if (this.fieldConfig instanceof FieldValidationConfig) {
      schema = Yup.array().defined().of(this.fieldConfig.value);
    } else if (this.fieldConfig instanceof FormGroup) {
      schema = Yup.array().defined().of(this.fieldConfig.getSchema());
    }

    return schema;
  }

  public validate(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

interface IFormBuilder {
  group: <TVal extends TGroup>(controls: TVal) => IFormGroup;
  array: <TVal extends TArray>(control: TVal) => IFormArray;
}

class FormBuilder implements IFormBuilder {
  public group<T extends TGroup>(controls: T): IFormGroup {
    return new FormGroup(controls);
  }

  public array<T extends TArray>(control: T): IFormArray {
    return new FormArray(control);
  }
}

//--

var builder = new FormBuilder();

var group = builder.group({
  name: builder.group({
    firstname: { value: Yup.string().defined(), validators: [requiredValidator(), minLengthValidator(4)] } as FieldValidationConfig,
    lastname: { value: Yup.string().defined(), validators: [requiredValidator()] } as FieldValidationConfig,
  }),
  roles: builder.array({ value: Yup.string().defined(), validators: [requiredValidator()] } as FieldValidationConfig),
  address: { value: Yup.string().defined(), validators: [requiredValidator()] } as FieldValidationConfig
});


group.validate()
  .then((response) => {
    console.log("Validation ? ", response ? "passed" : "faild");
  });

