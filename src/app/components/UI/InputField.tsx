import { ChangeEvent } from "react";

export interface InputFieldProps {
	name: string;
  id: string;
  autoComplete: string;
  placeholder:string;
  type: string;
	error: string;
	isTouched: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

export default function InputField({
  name,
  id,
  autoComplete,
  placeholder,
  type,
	error,
	isTouched,
  value,
  onChange,
  onBlur
}: InputFieldProps) {
	return (
		<div className="flex flex-col gap-1">
			<input
				name={name}
				id={id}
				autoComplete={autoComplete}
        type={type}
				className={`border p-2 rounded transition-colors dark:bg-slate-800 ${
					isTouched && error
						? "border-red-500"
						: "border-slate-300 dark:border-slate-700"
				}`}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
			<div className="h-[14px]">
				{isTouched && error && (
					<span className="text-red-500 text-[12px] leading-none block">
						{error}
					</span>
				)}
			</div>
		</div>
	);
}
