import { Link, Head } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useState } from "react";
import QuillInput from "@/Components/QuillInput";
import InputSwitch from "@/Components/InputSwitch";
import FileInputDropdown from "@/Components/FileInputDropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import Checkbox from "@/Components/Checkbox";
import Radio from "@/Components/Radio";
import Select from "@/Components/Select";
import { toast } from "react-toastify";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [value, setValue] = useState("");

    const [isEnabled, setIsEnabled] = useState(false);
    const handleSwitchChange = (newValue) => {
        setIsEnabled(newValue);
    };

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const [selectedRadioOption, setSelectedRadioOption] = useState("option1");
    const handleRadioChange = (option) => {
        setSelectedRadioOption(option);
    };

    const [selectedOption, setSelectedOption] = useState("");
    const handleSelectChange = (newValue) => {
        setSelectedOption(newValue);
    };

    const showToast = () => {
        toast.success("This is a success toast"); // Display a success toast
    };

    return (
        <>
            <Head title="Welcome" />
            <ApplicationLogo></ApplicationLogo>
            <ApplicationLogo text></ApplicationLogo>
            <InputLabel required value="Text" />
            <TextInput type="text" placeholder="input text" />
            <InputLabel value="Text disabled" />
            <TextInput disabled type="text" placeholder="input text" />
            <InputLabel value="Password" />
            <TextInput type="Password" placeholder="Password" />
            <InputError message="error with code" />
            <TextInput type="time" />
            <QuillInput value={value} onChange={setValue} />
            <InputSwitch
                label="Active"
                initialValue={isEnabled}
                onChange={handleSwitchChange}
            />
            <FileInputDropdown />
            <PrimaryButton>Create</PrimaryButton>
            <PrimaryButton disabled>Disabled</PrimaryButton>
            <Select
                options={[
                    "Option 1",
                    "Option 2",
                    "Option 3",
                    "Option 1",
                    "Option 2",
                    "Option 3",
                    "Option 1",
                    "Option 2",
                    "Option 3",
                    "Option 1",
                    "Option 2",
                    "Option 3",
                    "Option 1",
                    "Option 2",
                    "Option 3",
                ]}
                defaultValue="Default Option"
                defaultSelectable={false}
                value={selectedOption}
                onChange={handleSelectChange}
            />
            <Checkbox
                label="Checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <Checkbox
                disabled
                label="Checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <div>
                <Radio
                    label="Option 1"
                    checked={selectedRadioOption === "option1"}
                    onChange={() => handleRadioChange("option1")}
                />
                <Radio
                    label="Option 2"
                    checked={selectedRadioOption === "option2"}
                    onChange={() => handleRadioChange("option2")}
                />
                <Radio
                    label="Option 3 (Disabled)"
                    checked={selectedRadioOption === "option3"}
                    disabled
                />
            </div>
            <PrimaryButton onClick={showToast}>Show Toast</PrimaryButton>
        </>
    );
}
