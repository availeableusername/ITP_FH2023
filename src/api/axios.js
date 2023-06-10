import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:3050'  //URL ändern auf Backend, geändert von 3000 auf 3050
})

const getData = () =>{
    axios.get('http://localhost:3000').then(response => {
        console.log(response);
    })
};

const sendData = () =>{};

