
const searchBlogs = (keyword, blogs) => {
  return blogs.filter(blog => blog.title.toLowerCase().includes(keyword.toLowerCase()));
};

const popularBlogs = (blogs) => {
  return blogs.sort((a, b) => b.views - a.views).slice(0, 10);
}

function createPopularCard(blog) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h3");
  title.innerHTML = `${blog.title} <span class="tag-cloud">${blog.category}</span>`;

  const content = document.createElement("p");
  content.textContent = blog.content;

  const author = document.createElement("p");
  author.classList.add("author");
  author.innerHTML = `<i class="fa fa-user"></i> ${blog.author} &nbsp; <i class="fa-solid fa-eye"></i> ${blog.views}`;


  const readMoreButton = document.createElement("button");
  readMoreButton.textContent = "Read more";

  card.appendChild(title);
  card.appendChild(content);
  card.appendChild(author);
  card.appendChild(readMoreButton);

  return card;
}

  fetch('blogs.json')
  .then((res) => res.json())
  .then(function (data) {

    // เข้าถึงอาร์เรย์ "blogs" ใน JSON
    const blogs = data.blogs;


    const filterPopularBlogs = popularBlogs(blogs);

    const popContainer = document.querySelector(".card-pop");

    filterPopularBlogs.forEach(blog => {
      const card = createPopularCard(blog);
      popContainer.appendChild(card);
    });


    // filter seach blogs

    // รับคีย์เวิร์ดจากอิลิเมนต์ <input>
    const input = document.getElementById("input-box");
    const searchBtn = document.getElementById("search-btn");


    const resultsContainer = document.getElementById("results");

    searchBtn.addEventListener("click", () => {

      const keyword = input.value.toLowerCase(); // รับค่าจาก <input> และทำเป็นตัวพิมพ์เล็ก
      const filteredBlogs = searchBlogs(keyword, blogs); // ใช้คีย์เวิร์ดในการกรองข้อมูล

      // ลบข้อมูลเก่าทิ้ง
      resultsContainer.innerHTML = ""; 

      if (filteredBlogs.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
      } else {

        filteredBlogs.forEach(blog => {
          const card = createPopularCard(blog);
          resultsContainer.appendChild(card);
        });
        
      }
    });

  })


