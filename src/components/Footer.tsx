"use client";

import React, { useState } from "react";

const SOCIALS = [
	{ name: "GitHub", url: "https://github.com/akiraraihaan" },
	{
		name: "LinkedIn",
		url: "https://www.linkedin.com/in/raihan-akira-r-6a76b6294/",
	},
	{ name: "X", url: "https://x.com/calmotionz" },
	{ name: "Instagram", url: "https://instagram.com/raihaan_ar" },
];

export default function Footer() {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [status, setStatus] = useState<string | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("loading");
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});
			if (res.ok) {
				setStatus("success");
				setForm({ name: "", email: "", message: "" });
			} else {
				setStatus("error");
			}
		} catch {
			setStatus("error");
		}
	};

	return (
		<footer className="w-full border-t mt-12 bg-white/80 dark:bg-black/40 backdrop-blur">
			<div className="max-w-2xl mx-auto py-8 px-4 flex flex-col gap-6 items-center">
				<form
					onSubmit={handleSubmit}
					className="w-full flex flex-col gap-3 bg-white/70 dark:bg-black/30 p-4 rounded-xl shadow"
				>
					<h3 className="font-semibold text-lg mb-1">
						Kirim Pesan ke Saya
					</h3>
					<input
						type="text"
						name="name"
						placeholder="Nama"
						value={form.name}
						onChange={handleChange}
						required
						className="border rounded px-3 py-2 text-sm"
					/>
					<input
						type="email"
						name="email"
						placeholder="Email Anda"
						value={form.email}
						onChange={handleChange}
						required
						className="border rounded px-3 py-2 text-sm"
					/>
					<textarea
						name="message"
						placeholder="Pesan"
						value={form.message}
						onChange={handleChange}
						required
						className="border rounded px-3 py-2 text-sm min-h-[80px]"
					/>
					<button
						type="submit"
						className="bg-black text-white rounded px-4 py-2 mt-2 hover:bg-gray-800 transition"
						disabled={status === "loading"}
					>
						{status === "loading" ? "Mengirim..." : "Kirim"}
					</button>
					{status === "success" && (
						<p className="text-green-600 text-xs mt-1">
							Pesan berhasil dikirim!
						</p>
					)}
					{status === "error" && (
						<p className="text-red-600 text-xs mt-1">
							Gagal mengirim pesan. Coba lagi.
						</p>
					)}
				</form>
				<div className="text-center text-sm text-gray-500 flex flex-col gap-2">
					<div>
						Powered by{" "}
						<a
							href="https://nextjs.org/"
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							Next.js
						</a>
						| Email:{" "}
						<a
							href="mailto:your_email@gmail.com"
							className="underline"
						>
							your_email@gmail.com
						</a>
					</div>
					<div className="flex gap-3 justify-center">
						{SOCIALS.map((s) => (
							<a
								key={s.name}
								href={s.url}
								target="_blank"
								rel="noopener noreferrer"
								className="underline"
							>
								{s.name}
							</a>
						))}
					</div>
					<div>© 2025 Raihan Akira R</div>
				</div>
			</div>
		</footer>
	);
}
