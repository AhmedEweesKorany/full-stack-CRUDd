async function getData() {
  await fetch("http://localhost:5000")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showData(data);
    });
}

function showData(e) {
  e.map((item) => {
    document.getElementById("tbody").innerHTML += `
        <tr>
					
						<td class="col col-2" id="cname">${item.name}</td>
						<td id="cemail">${item.Email}</td>
						<td id="caddress">${item.address}</td>
						<td id = "cphone">${item.phone}</td>
						<td>
							<a href="#editEmployeeModal" class="edit" data-toggle="modal"  data-productID=${item.id} onclick=ID(${item.id})><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
							<a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-productID=${item.id} onclick=deleteUser(${item.id})><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
						</td>
					</tr>`;
  });
}
const getFormData =  () => {
  data = {
    name: document.getElementById("name").value,
    Email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    phone: document.getElementById("phone").value,
  };

  return data
};


document.getElementById("adduser").onclick = async function addUesr(e) {
  e.preventDefault();
  getFormData();

  console.log(data);
  await fetch("http://localhost:5000/adduser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  window.location.reload();
};

async function deleteUser(id) {
  await fetch(`http://localhost:5000/deleteuser/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

var finalID = null
const ID = function (i){
     finalID = i
     console.log(finalID)
}

const updateBtn = document.getElementById('saveData')

updateBtn.onclick = function updateProduct(e){
    e.preventDefault()
    let data = {
        name: document.getElementById("sname").value,
        Email: document.getElementById("semail").value,
        address: document.getElementById("saddress").value,
        phone: document.getElementById("sphone").value,
      }
    console.log(data);
    fetch(`http://localhost:5000/updateuser/${finalID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data),
      })

      window.location.reload()
}
getData();
