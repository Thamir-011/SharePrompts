'use client'

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"
import Image from "next/image"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => ( 
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

function Feed() {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data)
      setFilteredPosts(data)
    }

    fetchPosts()
  }, [])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
    let searchFor = e.target.value.toLowerCase()
    let searchKey = searchFor[0];

    switch (searchKey) {
    case "@":
      setFilteredPosts(posts.filter(post =>{
        return post.creator.username.toLowerCase().includes(searchFor.substring(1))
      }))
      break;
    case "#":
      setFilteredPosts(posts.filter(post =>{
        return post.tag.toLowerCase().includes(searchFor.substring(1))
      }))
      break;
    case "":
      setFilteredPosts(posts)
      break;
    default:
      setFilteredPosts(posts.filter(post =>{
        return post.prompt.toLowerCase().includes(searchFor)
      }))
      break;
    }
  }

  const handleTagClick = (tag) => {
    setSearchText("#" + tag)
  }

  const emptySearch = () => {
    setSearchText("")
    setFilteredPosts(posts)
  }

  return (
    <section className="feed">
      <form className="relative w-full flex flex-col items-center">
        <div className="search_input">
          <input 
            type="text" 
            placeholder="Search for a tag or a username" 
            value={searchText}
            onChange={handleSearchChange}
            required
            className="peer outline-none w-full"
          />
          <div 
            className="cursor-pointer"
            onClick={emptySearch}
          >
            <Image 
              src={"assets/icons/x.svg"}
              width={15}
              height={15}
              alt="X"
            />
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-1">You can use @ to search by username and # for tags</p>
      </form>

      <PromptCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed