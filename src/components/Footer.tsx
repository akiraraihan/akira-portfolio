"use client";

import React, { useState } from "react";
import { PulsatingButton } from "@/components/magicui/pulsating-button";

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
		<footer id="contact" className="w-full border-t mt-12 bg-black backdrop-blur max-w-49/50 mx-auto mb-4 rounded-4xl scroll-mt-32">
			<div className="max-w-2xl mx-auto py-8 px-4 flex flex-col gap-6 items-center">
				<form
					onSubmit={handleSubmit}
					className="w-full flex flex-col gap-3 bg-white dark:bg-black/30 p-4 rounded-xl shadow"
				>
					<h3 className="font-semibold text-lg tracking-tight mb-1">
						Send Me a Message, directly!
					</h3>
					<input
						type="text"
						name="name"
						placeholder="Name"
						value={form.name}
						onChange={handleChange}
						required
						className="border rounded px-3 py-2 text-sm"
					/>
					<input
						type="email"
						name="email"
						placeholder="Your Email"
						value={form.email}
						onChange={handleChange}
						required
						className="border rounded px-3 py-2 text-sm"
					/>
					<textarea
						name="message"
						placeholder="Message"
						value={form.message}
						onChange={handleChange}
						required
						className="border rounded px-3 py-2 text-sm min-h-[80px]"
					/>
					<PulsatingButton
						type="submit"
						disabled={status === "loading"}
						className="mt-2 w-2/3 mx-auto"
					>
						{status === "loading" ? "Sending..." : "Send"}
					</PulsatingButton>
					{status === "success" && (
						<p className="text-green-600 text-xs mt-1">
							Message sent successfully!
						</p>
					)}
					{status === "error" && (
						<p className="text-red-600 text-xs mt-1">
							Failed to send message. Please try again.
						</p>
					)}
				</form>
				<div className="text-center text-sm text-gray-500 flex flex-col gap-2">
					<div>
						<a
							href="mailto:raihanakirar@gmail.com"
							className="hover:underline"
						>
							raihanakirar@gmail.com
						</a>
					</div>
					<div>© 2025 Raihan Akira R</div>
				</div>
			</div>
		</footer>
	);
}
