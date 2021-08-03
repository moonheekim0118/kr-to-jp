import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { MAX_TEXT } from "@constants/index";
import "./style.scss";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  handleConvert: () => void;
}

function TextArea(props: Props, ref) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    props.handleConvert();
  }, [value]);

  useImperativeHandle(ref, () => value, [value]);

  function handleChange({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement>): void {
    const value = target.value;
    if (value.trim().length > MAX_TEXT) {
      setError(true);
      return;
    } else {
      setError(false);
      setValue(value);
    }
  }

  return (
    <div className="textarea-container">
      <label className="title" htmlFor="korean-textarea">
        한본어를 입력하세요
      </label>
      <textarea
        name="korean-textarea"
        className="korean-textarea"
        placeholder="예시) 아리가또고자이마스"
        value={value}
        onChange={handleChange}
      />
      {error && <p className="error">최대 1000자 까지 번역 가능합니다.</p>}
    </div>
  );
}

export default forwardRef(TextArea);
