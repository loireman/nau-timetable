import React, { useState } from "react";

function FileInputDropdown() {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setSelectedFiles([...selectedFiles, ...newFiles]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const newFiles = Array.from(e.dataTransfer.files);
        setSelectedFiles([...selectedFiles, ...newFiles]);
    };

    const removeFile = (index) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(updatedFiles);
    };

    return (
        <div className="file-input-dropdown">
            <div
                className="file-input-container"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <label htmlFor="file-input" className="file-input-label">
                    Select or Drop Files
                </label>
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    id="file-input"
                    className="file-input"
                />
            </div>
            {selectedFiles.length > 0 && (
                <div className="dropdown">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="file-item">
                            <span>{file.name}</span>
                            <button onClick={() => removeFile(index)}>
                                <svg
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M5.99932 7.41421L1.75668 11.6569L0.342465 10.2426L4.58511 6L0.342466 1.75736L1.75668 0.343143L5.99932 4.58579L10.242 0.343143L11.6562 1.75736L7.41354 6L11.6562 10.2426L10.242 11.6569L5.99932 7.41421Z" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FileInputDropdown;
