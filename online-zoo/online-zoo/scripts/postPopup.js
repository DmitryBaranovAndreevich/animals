const allPosts = testimonials.querySelectorAll(".testimonials__post");
const postPopup = document.querySelector(".popup__post");
const popContainer = postPopup.querySelector(".popup__post-container");

for(let i = 0; i < allPosts.length; i++) {
  allPosts[i].addEventListener('click', () => {
    const postInPopup = postPopup.querySelector(".testimonials__post");
    if(postInPopup) postInPopup.remove();
    if(screen.width <= 640){
    openPopup(postPopup);
    const post = addPost(testimonialsPosts[i]);
    post.classList.add("testimonials__post_position_popup");
    post
      .querySelector(".testimonials__post-wrapper")
      .classList.add("testimonials__post-wrapper_position_popup");
      post
        .querySelector(".testimonials__text")
        .classList.add("testimonials__text_position_popup");
    popContainer.append(post);
    }
  })
}