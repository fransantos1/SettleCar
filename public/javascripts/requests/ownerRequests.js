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
        const response = await fetch(`/api/car/auth/car/${carid}`);
        var result = await response.json();
        return { successful: response.status == 200,
                 cars: result};
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
        return { successful: response.status == 200};
    } catch (err) {
        console.log(err);
        return {err: err};
    }
}