import React from 'react';

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  textarea = false,
}) => {
  const InputComponent = textarea ? 'textarea' : 'input';

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </label>
      <InputComponent
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input input-bordered w-full ${textarea ? 'textarea textarea-bordered' : ''}`}
        required={required}
      />
    </div>
  );
};

export default FormInput;
