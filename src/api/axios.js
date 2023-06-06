import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:3500'  //URL ändern auf Backend, geändert von 3000 auf 4000
})

const getData = () =>{
    axios.get('http://localhost:3000').then(response => {
        console.log(response);
    })
};

const sendData = () =>{};

