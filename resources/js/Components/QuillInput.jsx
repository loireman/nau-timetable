import ReactQuill from "react-quill";

function QuillInput({ value, onChange }) {
    const handleChange = (content, delta, source, editor) => {
        onChange(content);
    };

    return (
        <div className="text-editor">
            <ReactQuill
                modules={{
                    toolbar: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link"],
                        ["image", "video"],
                        ["clean"],
                    ],
                }}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}

export default QuillInput;
