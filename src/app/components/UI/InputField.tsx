import { ReactNode } from "react";

export interface InputFieldProps {
	name: string;
	error: string;
	isTouched: boolean;
	children: ReactNode
}

export default function InputField({
	error,
	isTouched,
	children,
}: InputFieldProps) {
	return (
		<div className="flex flex-col gap-1">
			{children}
			{/* Резервуємо місце (14px), щоб текст не совав контент */}
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
