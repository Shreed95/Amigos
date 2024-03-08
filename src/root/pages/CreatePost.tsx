import PostForm from "@/components/forms/PostForm"

const CreatePost = () => {
  return (
    <div className="fle flex-1 md:overflow-y-scroll">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/add-post.svg" alt="add-post" width={36} height={36} />
          <p className="h3-bold md:h2-bold text-left w-full">Create a Post</p>
        </div>
        <PostForm action="Create" />
      </div>
    </div>
  )
}

export default CreatePost