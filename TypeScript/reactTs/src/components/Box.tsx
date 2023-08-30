/*
import { ReactNode } from "react";

type PropType = {
  title: string;
  count: number;
  children: ReactNode;
};

const Box = ({ title, count, children }: PropType) => {
  return (
    <div>
      <h1>{`${title}`}</h1>
      <p>{count}</p>
      {children}
    </div>
  );
};

*/

type InputValType = string | number;
const Box = <T extends InputValType>({
  label,
  value,
  setValue,
}: {
  label: string;
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}) => {
  return (
    <form>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          setValue(e.target.value as T);
        }}
      />
      <button type="submit">Submit Now</button>
    </form>
  );
};

export default Box;
