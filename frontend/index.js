async function  getData() {
   await fetch("http://localhost:5000")
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        showData(data)
    });
    
}

function showData(e) {
  e.map((item) => {
    document.getElementById("tbody").innerHTML += `
        <tr>
					
						<td class="col col-2">${item.name}</td>
						<td>${item.Email}</td>
						<td>${item.address}</td>
						<td>${item.phone}</td>
						<td>
							<a href="#editEmployeeModal" class="edit" data-toggle="modal"  data-productID=${item.id} ><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
							<a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-productID=${item.id} onclick=deleteUser(${item.id})><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
						</td>
					</tr>`;
  });
}

document.getElementById('adduser').onclick = async function addUesr(e){
    e.preventDefault()
        const data = {
            name: document.getElementById('name').value,
            Email: document.getElementById("email").value,
            address: document.getElementById("address").value,
            phone: document.getElementById("phone").value
        }
    
        console.log(data);
        await fetch('http://localhost:5000/adduser', {
           method:"POST",
           headers:{
            "Content-Type" : "application/json"
           },
           body: JSON.stringify(data)
          })

          window.location.reload()
    }


async function deleteUser(id){
    await fetch(`http://localhost:5000/deleteuser/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type" : "application/json"
        }
    })
}

getData()