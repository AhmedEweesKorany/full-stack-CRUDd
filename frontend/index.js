//getting data from API
async function getData() {
  await fetch("http://localhost:5000")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showData(data);
    });
}

//showing data in html page
let arr =[]
function showData(e) {
  e.map((item) => {

    arr.push({id:item.id,name:item.name,email:item.Email,address:item.address,phone:item.phone})
    document.getElementById("tbody").innerHTML += `
        <tr>
					
						<td class="col col-2" id="cname">${item.name}</td>
						<td id="cemail">${item.Email}</td>
						<td id="caddress">${item.address}</td>
						<td id = "cphone">${item.phone}</td>
						<td>
							<a href="#editEmployeeModal" class="edit" data-toggle="modal" onclick=ID(${item.id})><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
							<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"  onclick=deleteUser(${item.id})><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
						</td>
					</tr>`;
        }
        
        );
}

//getting data from form
const getFormData =  () => {
  data = {
    name: document.getElementById("name").value,
    Email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    phone: document.getElementById("phone").value,
  };

  return data
};



// adding new user
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


//delete user
async function deleteUser(id) {
  await fetch(`http://localhost:5000/deleteuser/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}


//get specific id properties
var finalID = null
const ID = function (i){
  finalID = i
  console.log(finalID)
  arr.map((item)=>{
    if(finalID === +item.id){
      document.getElementById("sname").value = item.name
      document.getElementById("semail").value = item.email
      document.getElementById("saddress").value = item.address
      document.getElementById("sphone").value = item.phone
    }
  })
}


//update values 
const updateBtn = document.getElementById('saveData')

updateBtn.onclick = function updateProduct(e){
    e.preventDefault()
    let data = {
        name: document.getElementById("sname").value ,
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