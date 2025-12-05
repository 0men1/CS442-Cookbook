"use client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RecipePostSchema } from "@/schemas"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { create_post } from "@/data/post";

export default function RecipeForm() {
	const { data: session } = useSession();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof RecipePostSchema>>({
		resolver: zodResolver(RecipePostSchema),
		defaultValues: {
			title: "",
			body: "",
			ingredients: "",
			instructions: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof RecipePostSchema>) => {
		setIsSubmitting(true);
		try {
			const response = await create_post({
				...values,
				user_id: session?.user.id!,
				post_type: "recipe"
			})
			if (response) {
				router.push("/");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader className="space-y-1">
				<div className="flex items-center gap-3">
					<div className="h-8 w-1 bg-primary rounded-full" />
					<h2 className="text-2xl font-semibold">New Recipe</h2>
				</div>
				<p className="text-sm text-muted-foreground pl-7">
					Share your culinary creations
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
									<FormLabel>Recipe Name</FormLabel>
									<FormControl>
										<Input placeholder="Enter recipe name" {...field} />
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
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Describe your recipe"
											className="min-h-32 resize-none"
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
						<FormField
							control={form.control}
							name="ingredients"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ingredients</FormLabel>
									<FormControl>
										<Textarea
											placeholder="List ingredients (one per line)"
											className="min-h-40 resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="instructions"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Instructions</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Step-by-step cooking instructions (one instruction per line)"
											className="min-h-40 resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							data-testid="create-recipe-submit"
							onClick={form.handleSubmit(onSubmit)}
							className="w-full"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Creating..." : "Create Recipe"}
						</Button>
					</div>
				</Form>
			</CardContent>
		</Card>
	);
}
