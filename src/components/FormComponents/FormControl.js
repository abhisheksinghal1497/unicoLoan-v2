import DropDown from "./DropDown";
import InputField from "./InputField";

export const component = {
  readOnly: "readOnly",
  maskInput: "maskInput",
  input: "input",
  otpInput: "otpInput",
  number: "number",
  photograph: "photograph",
  dropdown: "dropdown",
  checkbox: "checkbox",
  datetime: "datetime",
  email: "email",
};

export const FormControl = ({ compType, options, ...rest }) => {
  switch (compType) {
    //   case component.readOnly:
    //     return <ReadOnly {...rest} />;
    case component.input:
      return <InputField {...rest} />;
    //   case component.otpInput:
    //     return <OtpInput {...rest} />;
    case component.number:
      return <InputField {...rest} type={"numeric"} />;
    case component.dropdown:
      return <DropDown {...rest} />;
    //   case component.checkbox:
    //     return <CheckBox {...rest} />;
    //   case component.datetime:
    //     return <CustomDatepicker {...rest} />;
  }
};
