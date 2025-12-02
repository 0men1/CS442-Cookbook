"use client"

import { RecipePostDetailPage } from "@/components/post/detail/RecipePostDetailPage";
import ThoughtPostDetailPage from "@/components/post/detail/ThoughtPostDetailPage";
import { get_post_by_id, Post } from "@/data/post";
import { useSession } from "next-auth/react";
import { use, useState, useEffect } from "react";


export default function PostDetailPage({ params }: { params: Promise<{ postId: string }> }) {
	const { postId } = use(params)
	const [postDetail, setPostDetail] = useState<Post | null>(null)
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status === "loading") return;
		if (!session?.user?.id) return;
		const fetchPost = async () => {
			try {
				const response = await get_post_by_id(postId, session.user.id);
				if (response) {
					setPostDetail(response);
				}
			} catch (error) {
				console.error("Failed to fetch post:", error);
			}
		};

		fetchPost();

	}, [postId, session, status]);



	if (postDetail != null) {
		console.log("Post detail", postDetail)
		if (postDetail.post_type == "recipe") {
			return (
				<RecipePostDetailPage recipe={postDetail as Post} />
			)
		} else if (postDetail.post_type == "thought") {
			return (
				<ThoughtPostDetailPage thought={postDetail as Post} />
			)
		}
	}
}
