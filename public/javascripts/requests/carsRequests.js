async function requestCars() {
    try {
        const response = await fetch('/api/car/');
        var result = await response.json();
        return { successful: response.status == 200,
                 cars: result.result};
    } catch (err) {
        console.log(err);
        return {err: err};
    }
}
async function requestSearchCars(start_date, return_date) {
    try {
        const response = await fetch(`/api/car/search/${start_date}/${return_date}`);
        var result = await response.json();
        return { successful: response.status == 200,
                 cars: result};
    } catch (err) {
        console.log(err);
        return {err: err};
    }
}
async function requestCar(id){
    try {
        const response = await fetch(`/api/car/${id}`);
        var result = await response.json();
        return { successful: response.status == 200,
                 car: result};
    } catch (err) {
        console.log(err);
        return {err: err};
    }
}
