"use client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ThoughtPostSchema } from "@/schemas"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { create_post } from "@/data/post";

export default function ThoughtForm() {
	const { data: session } = useSession();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof ThoughtPostSchema>>({
		resolver: zodResolver(ThoughtPostSchema),
		defaultValues: {
			title: "",
			body: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof ThoughtPostSchema>) => {
		setIsSubmitting(true);
		console.log("CHECKING LOG TING");
		console.log("session?.user.id!", session?.user.id!);
		
		try {
			let uploadedImageUrl = null;

			if (values.image instanceof File) {
			const fd = new FormData();
			fd.append("file", values.image);

			const uploadRes = await fetch("http://127.0.0.1:8000/api/posts/upload/", {
				method: "POST",
				body: fd,
			});

			const uploadJson = await uploadRes.json();
			uploadedImageUrl = uploadJson.url;
			}

			const payload = {
			title: values.title,
			body: values.body,
			user_id: session?.user.id!,
			post_type: "thought",
			images: uploadedImageUrl
				? [{ image_url: uploadedImageUrl }]
				: [],
			};

			const response = await create_post(payload);

			if (response) router.push("/");
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	console.log("LOGGGING");
			console.log("session?.user.id!", session?.user.id!);

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader className="space-y-1">
				<div className="flex items-center gap-3">
					<div className="h-8 w-1 bg-primary rounded-full" />
					<h2 className="text-2xl font-semibold">New Thought</h2>
				</div>
				<p className="text-sm text-muted-foreground pl-7">
					Capture your ideas and reflections
				</p>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<div className="space-y-6">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter thought title"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<FormItem>
								<FormLabel>Upload Image (optional)</FormLabel>
								<FormControl>
									<Input
									type="file"
									accept="image/*"
									onChange={(e) => field.onChange(e.target.files?.[0])}
									/>
								</FormControl>
								<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="body"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Body</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Share your thoughts..."
											className="min-h-40 resize-none"
											maxLength={500}
											{...field}
										/>
									</FormControl>
									<div className="flex justify-end">
										<span className="text-xs text-muted-foreground">
											{field.value.length}/500
										</span>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							onClick={form.handleSubmit(onSubmit)}
							className="w-full"
							disabled={isSubmitting}
							data-testid="create-thought-submit"
						>
							{isSubmitting ? "Creating..." : "Create Thought"}
						</Button>
					</div>
				</Form>
			</CardContent>
		</Card>
	);
}
