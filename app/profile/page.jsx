'use client'

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function MyProfile() {
    const router = useRouter();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState([])
    const userId = useSearchParams().get("id")

    useEffect(() => {
        // fetch user
        const fetchUser = async () => {
            const response = await fetch(`/api/users/${userId}`);
            const data = await response.json();
        
            setUser(data)
        }
        // fetch posts
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();

            setPosts(data)
        }

          // if(session?.user.id) 
        fetchUser();
        fetchPosts();
    }, [])
    

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete =  async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

        if(hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                const filterdPosts = posts.filter(p => p._id !== post._id)
                setPosts(filterdPosts)
            } catch (error) {
                console.log(error);
            }
        }
    }

  return (
    <Profile
        name={user.username}
        desc={"Welcome to your personalized profile page"}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile;