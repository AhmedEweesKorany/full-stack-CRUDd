/*   1) get products from database:-    */

// use getproducts to get data form backend server( api.js)
async function getProducts() {
    fetch('http://localhost:5000/products') // add api url to fetch function
        .then((response) => response.json()) //read the response body as JSON
        .then((data) => showProducts(data)) //call showproducts function and send response data in function paramter
}


// use showproducts to display response data in frontend  
function showProducts(products) {
    var fullProducts = ''
    for (let product of products) {      // make loop for response data and display every product as table row
        fullProducts += `<tr>            
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td>
            <button class="btn btn-danger" onclick="deleteProduct(${product.id})" }>Delete</button>
            <button class="btn btn-success"  onclick="updateFormButtons(${product.id})"  >Update</button>
        </td>
    </tr>`;
    }
    document.getElementById('tbody').innerHTML = fullProducts // add response data in table body
}

//call function to get data from backend (api.js)
getProducts();





/*  2) add product to database     */ 


//get inputs value from form by create getInputValues function
function getInputValues() {
    //get inputs value
    let name = document.getElementById('name').value
    let price = document.getElementById('price').value
    let description = document.getElementById('description').value

    // put this values in object    
    let data = {
        name: name,
        price: price,
        description: description
    }
    // return this object   
    return data
}

//get form add button
const addButton = document.getElementById("form-add")

//send object of values to backend(api.js) when click on add button by function addProduct
addButton.onclick = function addProduct(event) {
    event.preventDefault()
    const data = getInputValues() //call getInputValues function to return object of values in data constant
    fetch('http://localhost:5000/addproduct',
        { method: "POST", headers: { "content-type": "application/json " }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            getProducts()     // call get data function to refresh products after added product
        })

}


/* 3) Delete product     */
function deleteProduct(id) {  // recieve deleted product id in this function paramter from delete button when create event
    fetch(`http://localhost:5000/deleteProduct/${id}`, //send this id to delete request in api.js
        { method: "DELETE" })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            getProducts()   // call get data function to refresh products after deleted product
        })
}


/* 4) update Product */

var updatedID = null

//create event function when click update send button id and change form submit button form add product to update product
function updateFormButtons(id) {
    document.getElementById("form-add").setAttribute("class", "btn btn-primary mt-5 d-none") //make add product button hidden
    document.getElementById("form-update").setAttribute("class", "btn btn-primary mt-5 d-inline") //make update product button visible
    updatedID = id //add recevied id from function paramter in updatedId
}

//get form update product button
const updateButton = document.getElementById("form-update")

//create function to send updatedID and object of values to backend
updateButton.onclick = function updateProduct(event) {
    event.preventDefault()
    let data = getInputValues() //call function to get object of calues
    fetch(`http://localhost:5000/updateProduct/${updatedID}`, //send updatedID in url
        { method: "PUT", headers: { "content-type": "application/json " }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            getProducts()   // call get data function to refresh products after updated product
        })
}












