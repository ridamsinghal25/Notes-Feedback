import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormFieldInputProps = {
  form: any;
  label: string;
  name: string;
  description?: string;
  placeholder?: string;
  type?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "form">;

function FormFieldInput({
  form,
  label,
  name,
  description,
  placeholder,
  type = "text",
  ...props
}: FormFieldInputProps) {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel className={fieldState.error && "dark:text-red-500"}>
              {label}
            </FormLabel>
            <FormControl>
              {type === "file" ? (
                <Input
                  type="file"
                  {...props}
                  onChange={(e) => {
                    const file = e.target.files;
                    field.onChange(file![0]);

                    if (props?.onChange) {
                      props?.onChange(e);
                    }
                  }}
                />
              ) : (
                <Input
                  placeholder={placeholder}
                  type={type}
                  {...field}
                  {...props}
                />
              )}
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className={fieldState.error && "dark:text-red-500"} />
          </FormItem>
        )}
      />
    </>
  );
}

export default FormFieldInput;
