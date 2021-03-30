ip.addEventListener('keypress', buscarIp)

function buscarIp(){
    teclaEnter = event.keyCode;
    if(teclaEnter == 13){
        let ipValor = document.querySelector('#ip').value
        let api = `https://geo.ipify.org/api/v1?apiKey=at_qp3qhS3ma9WCYqA4Y7teThm5gQW6p&ipAddress=${ipValor}`

        console.log(ipValor)
        

        fetch(api)
        .then(result => result.json())
        .then(data => {
            let id = document.getElementById('id');
            id.innerHTML = `
                <p>${data.ip}</p>
            `
            let town = document.getElementById('town');
            town.innerHTML = `
                <p>${data.location.city}</p>
            `
            let time = document.getElementById('time');
            time.innerHTML = `
                <p>${data.location.timezone}</p>
            `
            let isp = document.getElementById('isp');
            isp.innerHTML = `
                <p>${data.isp}</p>
            `
            let long = data.location.lat;
            let lat = data.location.lng;
            console.log(long,lat)
            
            console.log(data)

            //Si el mapa ya Existe solo mostramos uno y cambiamos la ubicacion por cada ip
            let container = L.DomUtil.get('map');
            if (container != null) {
                container._leaflet_id = null;
            }

            let map = L.map('map').setView([`${long}`, `${lat}`], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([`${long}`, `${lat}`]).addTo(map)
          .openPopup();

        })
        .catch(err => console.log(err))
    }
}



