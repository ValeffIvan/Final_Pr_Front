const API_URL = process.env.REACT_APP_API_URL ?? "https://localhost:44361/api/";

export default API_URL;

export async function LoginPost(url, request){
    
    return await fetch(API_URL  + url, {
        method:'POST',
        mode:'cors',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
        },
        body: JSON.stringify(request)
    })
    .then((res) => res.text())
    .then((res) => res)
    .catch((err) => err);
}


export async function POST(url, request){
    
    return await fetch(API_URL  + url, {
        method:'POST',
        mode:'cors',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
        },
        body: JSON.stringify(request)
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}


export async function GET(url, request = null){
    let uri = "";
    if(request){
        uri = '/' + request;
    }
    return await fetch(API_URL  + url + uri, {
        method:'GET',
        mode:'cors',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
        }
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}


export async function PUT(url, request){

    return await fetch(API_URL  + url, {
        method:'PUT',
        mode:'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` || '',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(request)
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}


export async function DELETE(url, request){

    let uri = "";
    if(request){
        uri = '/' + request;
    }

    return await fetch(API_URL  + url + uri, {
        method:'DELETE',
        mode:'cors',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
        }
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}
