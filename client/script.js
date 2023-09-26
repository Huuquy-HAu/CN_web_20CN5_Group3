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
                <i 
                  class="fa-solid fa-pen" 
                  data-bs-toggle="modal"
                  data-bs-target="#id_${value._id}"
                ></i>
                <button 
                  class = "btn-delete-cart"
                  data-id="${value._id}"
                  onclick = "handleDeleteBlog('${value._id}')"
                >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>


                <div
                  class="modal fade"
                  id="id_${value._id}"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered text-dark">
                    <div class="modal-content">
                      <div class="modal-header border-0">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">
                          Sửa Blog
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control inp-creat-blog-title${value._id}"
                            id="floatingInput"
                            placeholder="Tiêu đề"
                            value="${value.title}"
                          />
                          <label for="floatingInput">Tiêu đề</label>
                        </div>

                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control inp-creat-blog-content${value._id}"
                            id="floatingInput"
                            placeholder="Nội dung"
                            value="${value.content}"
                          />
                          <label for="floatingInput">Nội dung</label>
                        </div>

                        <select
                          class="form-select font-weight-bold inp-creat-blog-tag${value._id}"
                          aria-label="Default select example"
                          value="${value.tag}"
                        >
                          <option value="">Thêm Tag</option>
                          <option value="Feature" ${value.tag == "Feature" ? "selected" : ""}>Feature</option>
                          <option value="Bug" ${value.tag == "Bug" ? "selected" : ""}>Bug</option>
                          <option value="Life" ${value.tag == "Life" ? "selected" : ""}>Life</option>
                        </select>
                      </div>
                      <div class="modal-footer border-0">
                        <button
                          type="button"
                          class="btn btn-secondary btn-close-modall"
                          data-bs-dismiss="modal"
                        >
                          Đóng
                        </button>
                        <button type="button" class="btn btn-primary btn-create-blog" data-bs-dismiss="modal" onclick="handleUpdateBlog('${value._id}')">Thêm</button>
                      </div>
                    </div>
                  </div>
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


const updateBlog = async (id, title, content, tag) => {
  const response = await fetch(`${apiUrl}/blog/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          title,
          content,
          tag
      })
  });

  if (response.status === 200) {
      const data = await response.json();
      console.log("Cập nhật blog thành công:", data);
      getAlBlog()

      // ...
  } else {
      console.log("Cập nhật blog thất bại:", response.status);
  }
};


const handleUpdateBlog = (id) => {
  console.log(id);
  const inpTitleCreatee = document.querySelector(".inp-creat-blog-title"+id);
  const inpContentCreatee = document.querySelector(".inp-creat-blog-content"+id);
  const inpTagCreatee = document.querySelector(".inp-creat-blog-tag"+id);

  console.log(inpTitleCreatee.value, inpContentCreatee.value, inpTagCreatee.value);
  
  updateBlog(id, inpTitleCreatee.value, inpContentCreatee.value, inpTagCreatee.value)

}