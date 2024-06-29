const loadUserdetails =() =>{
    const user_id = localStorage.getItem("user_id")

    fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("user-details-container")
        const div = document.createElement("user-all")
        div.classList.add("user-all")
        div.innerHTML = `
         
            <div class="user-img">
                <img src="images/man-1.jpg" alt="">

            </div>
            <div class="user-info">
                <h2>${data.username}</h2>
                <h3>${data.first_name + data.last_name}</h3>
                <h4>${data.email}</h4>

            </div>
        `
        parent.appendChild(div)
    })

}

loadUserdetails()