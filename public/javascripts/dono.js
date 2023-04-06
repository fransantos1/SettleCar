window.onload = async function () {
    let result = await checkAuthenticated(true);
    if(result.err) throw result.err;
    if(!result.authenthicated || user.type !== 2){
        changePage("index.html");
    }
}