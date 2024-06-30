const loadAllappointments =() =>{
    const patient_id = localStorage.getItem('patient_id')
    fetch(`https://testing-8az5.onrender.com/appointment/?patient_id=${patient_id}`)
    .then((res) => res.json())
    .then((data) =>{
        console.log(data)
        data.forEach((item)=>{
            console.log(item)
            const parent = document.getElementById("table-body")
            const tr = document.createElement("tr")
            tr.innerHTML = `
            <th scope="row">${item.id}</th>
            <td>${item.symptom}</td>
            <td>${item.appointment_type }</td>
            <td>${item.appointment_status}</td>
            <td>${item.doctor}</td>
            <td>1200</td>
            ${
                item.appointment_status == "Pending"?
                `<td class="text-danger">X</td>`
                : `<td>X</td>`

            }
            
            
            
            
            `
            parent.appendChild(tr)

        })
    })
}

loadAllappointments()