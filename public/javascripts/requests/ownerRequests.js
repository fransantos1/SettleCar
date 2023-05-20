async function requestOwnerCars() {
    try {
        const response = await fetch(`/api/car/auth`);
        var result = await response.json();
        return { successful: response.status == 200,
                 cars: result};
    } catch (err) {
        console.log(err);
        return {err: err};
    }
}
async function requestOwnerCar(carid) {
    try {
        const response = await fetch(`/api/car/auth/${carid}`);
        var result = await response.json();
        return { successful: response.status == 200,
                 cars: result};
    } catch (err) {
        console.log(err);
        return {err: err};
    }
}
async function AddCar(Car) {
    try {
        console.log(Car);
        const response = await fetch(`/api/car/auth`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "Post",
          body: JSON.stringify({
              car:Car
          })
        });
        let result = await response.json();
        return { successful: response.status == 200, msg: result};
    } catch (err) {
        console.log(err);
        return {err: err};
    }
}
async function DeleteCars(license) {
    try {
        const response = await fetch(`/api/car/auth`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "DELETE",
          body: JSON.stringify({
              licenseplate: license
          })
        });

        let msg = await response.json();
        return { successful: response.status == 200, msg: msg[0].msg};
    } catch (err) {
        console.log(err);
        return {err: err};
    }
}