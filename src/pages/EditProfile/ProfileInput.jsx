import {
  IconBrandGithub,
  IconCheck,
  IconEdit,
  IconWorld,
} from "@tabler/icons-react";
import "./editProfile.scss";
// import TextareaAutosize from "react-textarea-autosize";

const ProfileInput = ({
  iconName,
  fieldState,
  fieldName,
  editingField,
  setEditingField,
  setField, //ie. setGithub,
  className,
  maxLength,
  minLength,
  pattern,
  title,
  inputType = "input",
  fieldLabel,
}) => {
  const InputComponent = inputType;
  return (
    <div className="edit-input">
      {iconName == "IconBrandGithub" && <IconBrandGithub />}
      {iconName == "IconWorld" && <IconWorld />}
      {editingField === fieldName ? (
        <>
          <InputComponent
            type={inputType === null ? undefined : "text"}
            onChange={(e) => {
              setField(e.target.value);
            }}
            className={className || "profile-bio"} //standard name
            value={fieldState}
            maxLength={maxLength || undefined}
            minLength={minLength || undefined}
            pattern={pattern || undefined}
            title={title || undefined}
          />
          <IconCheck onClick={() => setEditingField("")} />
        </>
      ) : (
        <>
          <p className={className || "profile-bio"}>{fieldState}</p>
          <IconEdit onClick={() => setEditingField(fieldName)} />
          {fieldLabel && <p className="input-label">{fieldLabel}</p>}
        </>
      )}
    </div>
  );
};

export default ProfileInput;
