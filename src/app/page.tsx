"use client";

import { useState, useRef } from "react";
import PhotoEditorModal from "./components/PhotoEditorModal";
import SignaturePreview from "./components/UI/SignaturePreview";

export default function SignatureGenerator() {
	const [data, setData] = useState({
		name: "",
		position: "",
		email: "",
		photoUrl: "https://avatars.githubusercontent.com/u/9919?s=100&v=4",
		phone: "",
		website: "www.eliftech.com",
	});

	const signatureRef = useRef<HTMLDivElement>(null);

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [editorImageSrc, setEditorImageSrc] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!data.name.trim()) newErrors.name = "Mandatory field";
		if (!data.position.trim()) newErrors.position = "Mandatory field";
		if (!data.website.trim()) newErrors.website = "Mandatory field";
		if (!data.photoUrl?.trim()) newErrors.photoUrl = "Mandatory field";

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!data.email.trim()) {
			newErrors.email = "Mandatory field";
		} else if (!emailRegex.test(data.email)) {
			newErrors.email = "Invalid format";
		}

		const phoneRegex = /^[\+\d\s\-\(\)]+$/;
		if (!data.phone.trim()) {
			newErrors.phone = "Mandatory field";
		} else if (!phoneRegex.test(data.phone)) {
			newErrors.phone = "`Invalid format`";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleCopyHtml = async () => {
		if (!validateForm()) return;
		if (signatureRef.current) {
			await navigator.clipboard.writeText(signatureRef.current.innerHTML);
			alert("HTML copied!");
		}
	};

	const handleCopyVisual = async () => {
		if (!validateForm()) return;
		if (signatureRef.current) {
			const html = signatureRef.current.innerHTML;
			const blob = new Blob([html], { type: "text/html" });
			const clipboardItem = new ClipboardItem({ "text/html": blob });
			await navigator.clipboard.write([clipboardItem]);
			alert("Signature copied! You can paste (Ctrl+V) into mail!");
		}
	};

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		let userId = localStorage.getItem("signature_user_id");
		if (!userId) {
			userId = crypto.randomUUID();
			localStorage.setItem("signature_user_id", userId);
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = async () => {
			setEditorImageSrc(reader.result as string);
		};
		e.target.value = "";
	};

	const uploadCroppedImage = async (croppedBase64: string) => {
		let userId = localStorage.getItem("signature_user_id");
		if (!userId) {
			userId = crypto.randomUUID();
			localStorage.setItem("signature_user_id", userId);
		}

		try {
			setIsUploading(true);
			const res = await fetch("/api/upload", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					image: croppedBase64,
					userId: userId,
				}),
			});

			const data = await res.json();
			if (data.url) {
				setData((prev) => ({
					...prev,
					photoUrl: `${data.url}?t=${Date.now()}`,
				}));
			}
		} catch (error) {
			console.error("Помилка завантаження кропу:", error);
		}

		setIsUploading(false);
	};

	return (
		<div className="min-h-screen p-8 bg-gray-50 flex gap-8 font-sans text-black dark:bg-slate-950 dark:text-slate-400">
			<div className="w-1/3 bg-white p-6 rounded-lg shadow-sm h-fit border border-gray-200 dark:bg-slate-950 dark:border-slate-400">
				<h2 className="text-xl font-bold mb-4 dark:text-slate-400">
					Signature data
				</h2>
				<div className="flex flex-col gap-4">
					<input
						className="border p-2 rounded dark:text-slate-400"
						placeholder="Name"
						type="text"
						name="fullname"
						autoComplete="name"
						value={data.name}
						onChange={(e) => setData({ ...data, name: e.target.value })}
						onBlur={validateForm}
						style={{ borderColor: errors.name ? "red" : "inherit" }}
					/>
					{errors.name && (
						<div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>
					)}
					<input
						className="border p-2 rounded dark:text-slate-400"
						placeholder="Job title"
						type="text"
						name="jobtitle"
						autoComplete="organization-title"
						value={data.position}
						onChange={(e) => setData({ ...data, position: e.target.value })}
						onBlur={validateForm}
						style={{ borderColor: errors.position ? "red" : "inherit" }}
					/>
					{errors.position && (
						<div style={{ color: "red", fontSize: "12px" }}>
							{errors.position}
						</div>
					)}
					<input
						className="border p-2 rounded dark:text-slate-400"
						placeholder="Phone"
						type="tel"
						name="phone"
						autoComplete="tel"
						value={data.phone}
						onChange={(e) => setData({ ...data, phone: e.target.value })}
						onBlur={validateForm}
						style={{ borderColor: errors.phone ? "red" : "inherit" }}
					/>
					{errors.phone && (
						<div style={{ color: "red", fontSize: "12px" }}>{errors.phone}</div>
					)}
					<input
						className="border p-2 rounded dark:text-slate-400"
						placeholder="Email"
						type="email"
						name="email"
						autoComplete="email"
						value={data.email}
						onChange={(e) => setData({ ...data, email: e.target.value })}
						onBlur={validateForm}
						style={{ borderColor: errors.email ? "red" : "inherit" }}
					/>
					{errors.email && (
						<div style={{ color: "red", fontSize: "12px" }}>{errors.email}</div>
					)}
					<input
						className="border p-2 rounded hidden dark:text-slate-400"
						placeholder="Website"
						name="text"
						value={data.website}
						onChange={(e) => setData({ ...data, website: e.target.value })}
						onBlur={validateForm}
						style={{ borderColor: errors.website ? "red" : "inherit" }}
					/>
					{errors.website && (
						<div style={{ color: "red", fontSize: "12px" }}>
							{errors.website}
						</div>
					)}
					<input
						className="border p-2 rounded hidden dark:text-slate-400"
						placeholder="URL фото"
						value={data.photoUrl}
						onChange={(e) => setData({ ...data, photoUrl: e.target.value })}
						onBlur={validateForm}
						// style={{ borderColor: errors.photoUrl ? "red" : "inherit" }}
					/>
					{/* {errors.photoUrl && (
						<div style={{ color: "red", fontSize: "12px" }}>
							{errors.photoUrl}
						</div>
					)} */}
					{/* <input
						type="file"
						accept="image/png, image/jpeg"
						onChange={handleImageUpload}
						className="border p-2 rounded cursor-pointer dark:text-slate-400"
					/> */}

					<div className="flex flex-col gap-2">
						<label className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg cursor-pointer transition-colors font-medium">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
								<polyline points="17 8 12 3 7 8" />
								<line x1="12" y1="3" x2="12" y2="15" />
							</svg>
							{isUploading ? "Crop..." : "Center and load"}
							<input
								type="file"
								accept="image/png, image/jpeg"
								onChange={handleImageUpload}
								className="hidden"
							/>
						</label>
						{data.photoUrl !==
							"https://avatars.githubusercontent.com/u/9919?s=100&v=4" && (
							<p className="text-xs text-green-500 text-center">
								Photo uploaded!
							</p>
						)}
					</div>
				</div>
			</div>
			<div className="w-2/3 flex flex-col gap-4 dark:bg-slate-950">
				<div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 overflow-auto dark:bg-slate-950 dark:border-slate-400">
					<h2 className="text-sm text-gray-400 mb-4 uppercase dark:text-slate-400">
						Preview
					</h2>
					<SignaturePreview signatureRef={signatureRef} data={data} />
				</div>

				<div className="flex gap-4">
					<button
						onClick={handleCopyVisual}
						className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800 transition dark:bg-blue-950 cursor-pointer"
					>
						Copy for insert
					</button>
					<button
						onClick={handleCopyHtml}
						className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300 transition hidden"
					>
						Copy HTML
					</button>
				</div>
			</div>

			{editorImageSrc && (
				<PhotoEditorModal
					imageSrc={editorImageSrc}
					onClose={() => setEditorImageSrc(null)}
					onSave={uploadCroppedImage} // Запускає завантаження кропу
				/>
			)}
		</div>
	);
}
