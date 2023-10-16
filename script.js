const searchBlogs = (keyword, blogs) => {
  return blogs.filter(blog => blog.title.toLowerCase().includes(keyword.toLowerCase()));
};

const popularBlogs = (blogs) => {
  return blogs.sort((a, b) => b.views - a.views).slice(0, 10);
}

function fillterProduct(value) {
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    if(value.toLowerCase() == button.innerText.toLowerCase()){
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  let elements = document.querySelectorAll(".card");

elements.forEach((element) => {
  if(value.toLowerCase() == "all") {
    element.classList.remove("hide");
  }
  else {
    if(element.classList.contains(value)){
      element.classList.remove("hide");
    }
    else {
      element.classList.add("hide");
    }
  }
});

}


function createCard(blog) {
  const card = document.createElement("div");
  card.classList.add("card",blog.category, "hide" );

  const image = document.createElement("img");
  image.src = blog.image;

  const title = document.createElement("h3");
  title.innerHTML = `${blog.title} <span class="tag-cloud">${blog.category}</span>`;

  const content = document.createElement("p");
  content.textContent = blog.content;

  const author = document.createElement("p");
  author.classList.add("author");
  author.innerHTML = `<i class="fa fa-user"></i> ${blog.author} &nbsp; <i class="fa-solid fa-eye"></i> ${blog.views}`;


  const readMoreLink = document.createElement("a");
  readMoreLink.classList.add("read-more-link");
  readMoreLink.href = "blog.html";
  readMoreLink.textContent = "Read more";

  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(content);
  card.appendChild(author);
  card.appendChild(readMoreLink);

  return card;
}


function createPopularCard(blog) {
  const card = document.createElement("div");
  card.classList.add("popCard");

  const image = document.createElement("img");
  image.src = blog.image;

  const title = document.createElement("h3");
  title.innerHTML = `${blog.title} <span class="tag-cloud">${blog.category}</span>`;

  const content = document.createElement("p");
  content.classList.add("content");
  content.textContent = blog.content;

  const author = document.createElement("p");
  author.classList.add("author");
  author.innerHTML = `<i class="fa fa-user"></i> ${blog.author} &nbsp; <i class="fa-solid fa-eye"></i> ${blog.views}`;


  const readMoreLink = document.createElement("a");
  readMoreLink.classList.add("read-more-link");
  readMoreLink.href = "blog.html";
  readMoreLink.textContent = "Read more";

  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(content);
  card.appendChild(author);
  card.appendChild(readMoreLink);

  return card;
}

  fetch('blogs.json')
  .then((res) => res.json())
  .then(function (data) {

    // เข้าถึงอาร์เรย์ "blogs" ใน JSON
    const blogs = data.blogs;

    const blogContainer = document.querySelector(".blog-container");

    // สร้างและเพิ่มบล็อกในคอนเทนเนอร์
    blogs.forEach(blog => {
      const cardBox = createCard(blog);
      blogContainer.appendChild(cardBox);
    });





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



 fetch('statistics.json')
 .then((res) => res.json())
 .then(function (data) {
  // ดึงข้อมูลที่คุณต้องการแสดง
  const totalBlogs = data.statistics.totalBlogs;
  const totalViews = data.statistics.totalViews;

  // เข้าถึงและแก้ไข HTML โดยใช้ ID
  const statisticsSection = document.getElementById("statistics");
  const totalBlogsElement = statisticsSection.querySelector('.total-blogs');
  const totalViewsElement = statisticsSection.querySelector('.total-views');

  // แสดงข้อมูลใน HTML
  totalBlogsElement.textContent = `Total Blogs ${totalBlogs}`;
  totalViewsElement.textContent = `Total Views ${totalViews}`;
})

.catch(function (error) {
  console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
 })

 