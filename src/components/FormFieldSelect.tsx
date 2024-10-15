import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type FormFieldSelectProps = {
  form: any;
  label: string;
  name: string;
  description?: string;
  placeholder?: string;
  values: string[];
  disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

const FormFieldSelect = React.forwardRef<
  HTMLButtonElement,
  FormFieldSelectProps
>(
  (
    {
      form,
      label,
      name,
      description,
      placeholder,
      values = [],
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel className={fieldState.error && "dark:text-red-500"}>
              {label}
            </FormLabel>
            <FormControl>
              <Select
                {...field}
                ref={ref}
                onValueChange={field.onChange}
                disabled={disabled}
                {...props}
              >
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {values.map((item, index) => (
                    <SelectItem value={item?.toString()} key={item || index}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className={fieldState.error && "dark:text-red-500"} />
          </FormItem>
        )}
      />
    );
  }
);

export default FormFieldSelect;
