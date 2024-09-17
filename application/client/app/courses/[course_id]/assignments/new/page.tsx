"use client"

import { Input, DatePicker, Select, SelectItem, Button } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import CreateButton from "@/components/buttons/CreateButton";
import BackButton from "@/components/buttons/BackButton";
import { useState } from "react";
import { ValueTypesInput } from "@/extensions/data-contracts";
import { InputParameter } from "@/types/analyzerDefinitions";
import { createAssignment } from "@/utils/apiUtils";
import { redirect } from "next/navigation";

interface Props {
  params: { course_id: string };
}

export default function NewAssignment({ params: _params }: Props) {
    const [inputs, setInputs] = useState<InputParameter[]>([])

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

    async function addAssignment(
      data: FormData,
      numberOfInputs: number,
      courseId: string) {
  
      const metadata = [];
  
      for(let i = 0; i < numberOfInputs; i++) {
          const keyName = data.get(`keyName${i}`) as string
          const valueType = data.get(`valueType${i}`) as string
    
          metadata.push({
            key_name: keyName,
            value_type: valueType,
          });
      }
  
      const name = data.get("name") as string
      const dueDate = data.get("dueDate") as string
  
      await createAssignment({
        course_id: Number(courseId),
        name: name,
        due_date: dueDate.substring(0, dueDate.toString().indexOf("[")), 
        metadata: metadata
      })
      redirect(`/courses/${courseId}`)
  
  }

  return (
    <>
      <div className="max-w-50p grow p-4">
        <BackButton targetURL={`/courses/${_params.course_id}`} buttonText={`Course ${_params.course_id}`} />
        <h2 className="h2">Create new assignment</h2>
      </div>
      <form action={(data) => addAssignment(data, inputs.length, _params.course_id)}>
        <div className="max-w-50p grow p-4">
        <Input
            className="mt-4"
            type="string"
            label="Assignment name"
            name="name"
            defaultValue="Assignment"
          />
          <DatePicker
            className="mt-4"
            label="Due date"
            name="dueDate"
            defaultValue={now(getLocalTimeZone())}
            hideTimeZone
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
                name={`keyName${index}`}
                placeholder="Enter key name"
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
                name={`valueType${index}`}
                className="max-w-xs"
                defaultSelectedKeys={[param.value_type]}
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
              text={"Submit Assignment"}
            />
          </div>
        </div>
      </form>
    </>
  );
}
