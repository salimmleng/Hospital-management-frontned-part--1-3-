const loadservices = () => {
    fetch("https://testing-8az5.onrender.com/services/")
        .then((res) => res.json())
        .then((data) => displayService(data))
        .catch((err) => console.log(err));


}
loadservices()

const displayService = (services) => {
    services.forEach((service) => {
        const parent = document.getElementById('service-container')

        const li = document.createElement('li')
        li.innerHTML = `
        
        <div class="card shadow h-100">
            <div class="ratio ratio-16x9">
                <img src=${service.image} class="card-img-top" loading="lazy" alt="...">
            </div>
            <div class="card-body  p-3 p-xl-5">
                <h3 class="card-title h5">${service.name}</h3>
                <p class="card-text">${service.description.slice(0, 140)}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
                    
       `
        parent.appendChild(li)
    })
}

const loadDoctors = (search) => {
    document.getElementById("doctors").innerHTML = "";
    console.log(search);
    fetch(
        `https://testing-8az5.onrender.com/doctor/list/?search=${search ? search : ""
        }`
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.results.length == 0) {
                displayDoctorsNotFound()

            } else {
                displayDoctors(data?.results);

            }
        });
};
loadDoctors()

displayDoctorsNotFound = () => {
    const parent = document.getElementById("doctors")
    const div = document.createElement("div")
    div.innerHTML = '<img src="images/nodata.png" alt="">'
    parent.appendChild(div)

}
const displayDoctors = (doctors) => {
    doctors.forEach((doctor) => {

        const parent = document.getElementById("doctors")

        const div = document.createElement("div")
        div.classList.add("doc-card")

        div.innerHTML = `
        <img class="doc-img" src=${doctor?.image} alt="">
        <h3>${doctor?.full_name}</h3>
        <h6>${doctor?.designation[0]}</h6>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, quas.</p>
        <p>
         ${doctor.specialization?.map((item) => {
            return `<button>${item}</button>`

        })}
        </p>
        <button><a target="_blank" href="docDetails.html?doctorId=${doctor.id}">Details</a></button>
        `
        parent.appendChild(div)

    })
}



const laodDesignation = () => {
    fetch("https://testing-8az5.onrender.com/doctor/designation/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const parent = document.getElementById("drop-deg")
                const li = document.createElement("li")
                li.classList.add("dropdown-item")
                li.innerHTML = item.name

                parent.appendChild(li)

            })
        })
}


const loadSpecilization = () => {
    fetch("https://testing-8az5.onrender.com/doctor/specialization/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const parent = document.getElementById("drop-spe")
                const li = document.createElement("li")

                li.classList.add("dropdown-item")
                li.innerHTML = `
                <li onclick="loadDoctors('${item.name}')" >${item.name}</li>
                `
                parent.appendChild(li)

            })
        })
}

const SearchDoctor = () => {
    console.log("hello")
    const searchInput = document.getElementById("search")
    const value = searchInput.value
    loadDoctors(value)
    searchInput.value = ""


}

const loadReview = () =>{
    fetch("https://testing-8az5.onrender.com/doctor/review/")
    .then((res) => res.json())
    .then((data) => displayReview(data))
}

const displayReview = (reviews) =>{
    console.log(reviews)
    reviews.forEach((review) =>{
        const parent  = document.getElementById("review-container")
        const div = document.createElement("div")
        div.classList.add("review-card")
        div.innerHTML=`
            <img class="rev-img " src="images/man-1.jpg" alt="">
            <h4>${review.reviewer}</h4>
            <p>${review.body.slice(0,100)}</p>
            <h5>${review.rating}</h5>
        `
        parent.appendChild(div)

    })

}

laodDesignation()
loadSpecilization()
loadReview()

