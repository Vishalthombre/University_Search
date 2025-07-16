let btn = document.querySelector("button");
let ul = document.querySelector("ul");
let inp = document.querySelector("#input");

btn.addEventListener("click", async () => {
  let value = inp.value.trim();
  if (!value) {
    alert("Please enter a state");
    return;
  }
  ul.innerHTML = "";

  const apiUrl = `https://universities.hipolabs.com/search?country=India`;
  const proxyUrl = `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(apiUrl)}`;

  try {
    let res = await axios.get(proxyUrl);
    let datas = res.data;

    // Filter ignoring case and handle null states
    let filtered = datas.filter(d => {
      return d["state-province"] && d["state-province"].toLowerCase() === value.toLowerCase();
    });

    if (filtered.length === 0) {
      ul.innerHTML = "<li>No colleges found for this state.</li>";
      return;
    }

    for (let data of filtered) {
      let li = document.createElement("li");
      li.innerText = `${data.name} - State: ${data["state-province"]}`;
      ul.appendChild(li);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    ul.innerHTML = "<li>Error fetching data. Please try again later.</li>";
  }
});
