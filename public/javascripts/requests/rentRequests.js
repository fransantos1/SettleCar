async function requestRentCourseOwner(rentid, day) {
    try {
        const response = await fetch(`/api/rent/auth/getCourseOwner/${rentid}/${day}`);
        var result = await response.json();
        return { successful: response.status == 200,
                 result: result};
    } catch (err) {
        console.log(err);
        return {err: err};
    }
}


async function requestRentsFromUser(userid) {
    try {
        const response = await fetch(`/api/rent/fromUser/${userid}`);
        var result = await response.json();
        return { successful: response.status == 200,
                 rents: result};
    } catch (err) {
        console.log(err);
        return {err: err};
    }
}
async function verifyRent(rentid){
    try {
        const response = await fetch(`/api/rent/auth/verify`,{
            method: 'PATCH',
            body: JSON.stringify({
                rentid: rentid,
              }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },})
        var result = await response.json();
        
        
    return { successful: response.status == 200,
                 rents: result};
    } catch (err) {
        console.log(err);
        return {err: err};
    }
}
async function requestRentsFromCar(carid) {
    try {
        const response = await fetch(`/api/rent/auth/fromCar/${carid}`);
        var result = await response.json();
        return { successful: response.status == 200,
                 rents: result};
    } catch (err) {
        console.log(err);
        return {err: err};
    }
}