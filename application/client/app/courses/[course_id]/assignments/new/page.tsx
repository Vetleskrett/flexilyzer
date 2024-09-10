"use client"
import api from "@/utils/apiUtils";
import { Input, DatePicker, Select, SelectItem, Button } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import CreateButton from "@/components/buttons/CreateButton";
import BackButton from "@/components/buttons/BackButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ValueTypesInput } from "@/extensions/data-contracts";
import { InputParameter } from "@/types/analyzerDefinitions";

interface Props {
  params: { course_id: string };
}

export default function NewAssignment({ params: _params }: Props) {
    const router = useRouter();
    const [dueDate, setDueDate] = useState(now(getLocalTimeZone()))
    const [name, setName] = useState<string>("Assignment")

    const [inputs, setInputs] = useState<InputParameter[]>([])

    const updateInputParameter = (index: number, key: string, value: string) => {
      const updatedParameters = inputs.map((param, i) => {
        if (i === index) {
          // If value_type is "zip", key_name should be set to a default key_name accordingly
          if (key === "value_type" && value === ValueTypesInput.Zip) {
            return { ...param, [key]: value, key_name: "zip_file_path" };
          } else {
            return { ...param, [key]: value };
          }
        }
        return param;
      });

      setInputs(updatedParameters);
    };

    const removeInputParameter = (index: number) => {
      const updatedParameters = inputs.filter((_, i) => i !== index);
      setInputs(updatedParameters);
    };

    const addInputParameter = () => {
      const updatedParameters = [
        ...inputs,
        { id: inputs.length.toString(), key_name: "", value_type: ValueTypesInput.Str },
      ]
      setInputs(updatedParameters);
    };

     async function addAssignment() {
      console.log(dueDate.toString())

      const metadata = inputs.map(input => {
        return {
          key_name: input.key_name,
          value_type: input.value_type,
        }
      })

      await api.createAssignment({
        course_id: Number(_params.course_id),
        name: name,
        due_date: dueDate.toString().substring(0, dueDate.toString().indexOf("[")), 
        metadata: metadata
      })
      router.push(`/courses/${_params.course_id}`)
      router.refresh();
    }
  return (
    <>
      <div className="max-w-50p grow p-4">
        <BackButton targetURL={`/courses/${_params.course_id}`} buttonText={`Course ${_params.course_id}`} />
        <h2 className="h2">Create new assignment</h2>
        <Input
          className="mt-4"
          type="string"
          label="Assignment name"
          value={name}
          onValueChange={(value => setName(value))}
        />
        <DatePicker
          className="mt-4"
          label="Due date"
          value={dueDate}
          hideTimeZone
          onChange={setDueDate}
        />
      </div>
      <div className="max-w-100p grow p-4">
        <h3 className="h3">Parameters</h3>

        {inputs.map((param, index) => (
          <div key={index} className="mb-4 flex items-center space-x-2">
            <Input
              isDisabled={param.value_type === ValueTypesInput.Zip}
              isRequired
              label="Key Name"
              placeholder="Enter key name"
              value={param.key_name}
              onChange={(e) => {
                // Regular expression: starts with a lowercase letter, followed by any mix of lowercase, uppercase letters, or underscores
                const isValid = /^[a-z][a-zA-Z_]*$/.test(e.target.value);
                if (isValid || e.target.value === "") {
                  updateInputParameter(index, "key_name", e.target.value);
                }
              }}
            />

            <Select
              disabledKeys={
                inputs.some(
                  (input) => input.value_type === ValueTypesInput.Zip,
                )
                  ? [ValueTypesInput.Zip]
                  : []
              }
              isRequired
              disallowEmptySelection
              label="Select value type"
              className="max-w-xs"
              value={param.value_type}
              defaultSelectedKeys={[param.value_type]}
              onChange={(e) => {
                updateInputParameter(index, "value_type", e.target.value);
              }}
            >
              {Object.entries(ValueTypesInput).map((output) => (
                <SelectItem key={output[1]} value={output[1]}>
                  {output[0]}
                </SelectItem>
              ))}
            </Select>
            {/* Optional: Button to remove this parameter */}
            <Button color="danger" onClick={() => removeInputParameter(index)}>
              Remove
            </Button>
          </div>
        ))}
        <div className="flex w-full justify-center">
          <Button color="secondary" onClick={addInputParameter}>
            Add Parameter
          </Button>
        </div>

        <div className="flex justify-end">
          <CreateButton
            onClickFunction={addAssignment}
            text={"Submit Assignment"}
          />
        </div>
      </div>
    </>
  );
}
