const buttonEl = document.getElementById("button-create");

buttonEl.addEventListener("click", async (e) => {
  let res = await axios({
    url: "http://localhost:9000/products",
    method: "post",
  });
});

(async () => {
  let res = await axios({
    url: "http://localhost:9000/products/all",
    method: "get",
  });

  const ulEl = document.getElementById("list");

  if (res.data?.data?.length > 0) {
    for (let i = 0; i < res.data.data.length; i++) {
      let productItem = res.data.data[i];

      const li = document.createElement("li");

      li.textContent = productItem.title;

      ulEl.appendChild(li);
    }
  }
})();
