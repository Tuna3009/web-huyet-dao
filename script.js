let diseases = [];

// Tải danh sách bệnh từ file JSON
fetch("data/disease-list.json")
  .then(response => {
    if (!response.ok) throw new Error("Không tìm thấy danh sách bệnh.");
    return response.json();
  })
  .then(data => {
    diseases = data;
  })
  .catch(error => console.error("Lỗi khi tải danh sách bệnh:", error));

// Hàm gợi ý bệnh dựa trên từ khóa nhập vào
function suggestDiseases() {
  const input = document.getElementById("search").value.toLowerCase();
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";  // Xóa gợi ý cũ

  if (input === "") return;

  // Tìm các bệnh khớp với từ khóa
  const matches = diseases.filter(disease =>
    disease.toLowerCase().includes(input)
  );

  // Hiển thị gợi ý
  matches.forEach(match => {
    const li = document.createElement("li");
    li.textContent = match;
    li.onclick = () => {
      document.getElementById("search").value = match;
      suggestions.innerHTML = "";
    };
    suggestions.appendChild(li);
  });
}

// Hàm tìm kiếm và hiển thị thông tin bệnh từ file txt
function searchDisease() {
  const disease = document.getElementById("search").value
    .toLowerCase()
    .replace(/\s/g, '-')
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");  // Loại bỏ dấu tiếng Việt

  fetch(`data/${disease}.txt`)
    .then(response => {
      if (!response.ok) {
        console.error("Lỗi fetch:", response.status, response.statusText);
        throw new Error(`Không tìm thấy bệnh: ${disease}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("result").innerText = data;
    })
    .catch(error => {
      document.getElementById("result").innerText = "Không tìm thấy bệnh hoặc lỗi fetch.";
    });
}

// Gán sự kiện gợi ý khi nhập
document.getElementById("search").addEventListener("input", suggestDiseases);
