"use client"

import { RecipePostDetailPage } from "@/components/post/detail/RecipePostDetailPage";
import ThoughtPostDetailPage from "@/components/post/detail/ThoughtPostDetailPage";
import { Post, RecipePost, ThoughtPost } from "@/types/posts";
import { use, useState, useEffect } from "react";


export default function PostDetailPage(
	{ params }:
		{ params: Promise<{ postId: string }> }) {

	const { postId } = use(params)
	const [postDetail, setPostDetail] = useState<Post | null>(null)

	useEffect(() => {
		async function fetchPostDetails() {

			try {
				const res = await fetch(`http://127.0.0.1:8000/api/posts/${postId}/`);
				if (!res.ok) throw new Error("Failed to fetch posts");
				const data = await res.json()
				console.log(data)
				if (data) {
					setPostDetail(data)
				}
			} catch (error) {
				console.error("Error feching posts: ", error);
			}
		}
		fetchPostDetails()
	}, [])



	if (postDetail != null) {
		if (postDetail.post_type == "recipe") {
			return (
				<RecipePostDetailPage recipe={postDetail as RecipePost} />
			)
		} else if (postDetail.post_type == "thought") {
			return (
				<div>
					<ThoughtPostDetailPage thought={postDetail as ThoughtPost} />
				</div>
			)
		}
	}
}
