let url = "https://universities.hipolabs.com/search?name=india";

let btn = document.querySelector("button");
let ul = document.querySelector("ul");
let inp = document.querySelector("#input");

btn.addEventListener("click", async () => {
  let datas = await getData();
  let value = inp.value;
  ul.innerHTML = "";
  for (data of datas) {
    if (data["state-province"] == value) {
      let li = document.createElement("li");
      li.innerText = data.name + ": " + "State:" + " " + data["state-province"];
      ul.appendChild(li);
    }
  }
});

async function getData() {
  let res = await axios.get(url);
  return res.data;
}
