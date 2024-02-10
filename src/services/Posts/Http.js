const backendurl = "http://localhost:5033/api/";

export default backendurl;

export async function GET(url, request = null){

    let uri = "";
    if(request){
        uri = '?' + new URLSearchParams(request).toString();
    }

    return await fetch(backendurl + url + uri, {
        method:'GET',
        mode:'cors',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('jwt')}` || ''
        }
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}