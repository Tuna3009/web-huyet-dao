let diseases = [];

// Tải danh sách bệnh từ file JSON
fetch("data/disease-list.json")
    .then(response => response.json())
    .then(data => {
        diseases = data;
    })
    .catch(error => console.error("Lỗi khi tải danh sách bệnh:", error));

// Gợi ý bệnh dựa trên từ khóa nhập vào
function suggestDiseases() {
    const input = document.getElementById("search").value.toLowerCase();
    const suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = ""; 

    if (input === "") return; 

    const matches = diseases.filter(disease => disease.toLowerCase().includes(input));

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

// Tìm kiếm bệnh và hiển thị thông tin
function searchDisease() {
    const disease = document.getElementById("search").value.toLowerCase().replace(/\s/g, '-');
    fetch(`data/${disease}.txt`)
        .then(response => {
            if (!response.ok) throw new Error("Không tìm thấy bệnh");
            return response.text();
        })
        .then(data => {
            document.getElementById("result").innerText = data;
        })
        .catch(error => {
            document.getElementById("result").innerText = error.message;
        });
}
