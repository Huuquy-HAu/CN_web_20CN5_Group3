let apiUrl = "http://localhost:4000";
let leftContainer = document.querySelector(".right-container-left-header");
let inpTitleCreate = document.querySelector(".inp-creat-blog-title");
let inpContentCreate = document.querySelector(".inp-creat-blog-content");
let inpTagCreate = document.querySelector(".inp-creat-blog-tag");
let btnCreateBlog = document.querySelector(".btn-create-blog");
let btnCloseModal = document.querySelector(".btn-close-modall");

let timeClock = setInterval(() => {
  let dateTime = new Date();
  leftContainer.innerHTML = dateTime.toLocaleString();
}, 1000);

const createBlog = async (title, content, tag) => {
  const response = await fetch(`${apiUrl}/blog`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
      tag: tag,
    }),
  });

  if (response.status === 200) {
    const data = await response.json();
    getAlBlog();
    console.log("Tạo blog thành công:", data);
    alert("thành công !!");
  } else {
    console.log("Tạo blog thất bại:", response.status);
    alert("Thất bại !!");
  }
};

const getAlBlog = async () => {
  const response = await fetch(`${apiUrl}/blog`);

  if (response.status === 200) {
    const data = await response.json();
    console.log("Lấy tất cả blog thành công:", data);

    const ListBlog = data?.map((value, index) => {
      return `<div class="cart" data-id="${value._id}">
                <div class="cart-left">
                <div class="cart-title">${value.title}</div>
                <div class="cart-content">${value.content}</div>
                </div>
    
                <div class="cart-right">
                <i class="fa-solid fa-pen"></i>
                <button 
                  class = "btn-delete-cart"
                  data-id="${value._id}"
                  onclick = "handleDeleteBlog('${value._id}')"
                >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
            </div>`;
    });

    document.querySelector(".body").innerHTML = ListBlog.join("");
  } else {
    console.log("Lấy tất cả blog thất bại:", response.status);
  }
};

getAlBlog();

const deleteBlog = async (id) => {
  const response = await fetch(`${apiUrl}/blog/${id}`, {
      method: "DELETE"
  });

  if (response.status === 200) {
      const data = await response.json();
      console.log("Xóa blog thành công:", data);
      getAlBlog();
      alert("Xóa thành công")
  } else {
      console.log("Xóa blog thất bại:", response.status);
  }
};


btnCreateBlog.addEventListener("click", () => {
  console.log(inpTitleCreate.value, inpContentCreate.value, inpTagCreate.value);

  if (!inpTitleCreate.value || !inpContentCreate.value || !inpTagCreate.value) {
    alert("không được bỏ trống thông tin");
    return;
  }

  createBlog(inpTitleCreate.value, inpContentCreate.value, inpTagCreate.value);
  inpTitleCreate.value = ""
  inpContentCreate.value = ""
  inpTagCreate.value = ""
});


const handleDeleteBlog = (id) => {
  console.log(id);
  let text = "Bạn có chắc chắn muốn xóa không";
  if (confirm(text) == true) {
    deleteBlog(id);
  } else {
    text = "You canceled!";
  }
};

