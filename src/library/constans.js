import { post } from "library/request";

let swap = (o,r={})=> Object.keys(o).map(x=>r[o[x]]=x)&&r;

export const constans = async (token) => {
    try {
        const res = await post("constans", { token });
        let temp = {};
        if (res?.message == 'Success') {
            for (let i in res.data)
                temp[i] = swap(res.data[i]);     
        }
        return temp;
    } catch (error) {
        return {};
    } 
}
export const getList = async (token,table) => {
    try {
        const res = await post("get", { token ,table });
        let temp = {};
        if (res?.message == 'Success') {
            for (let i of res.data)
                temp[i.id] = i.name;     
        }
        return temp;
    } catch (error) {
        return {};
    } 
}

  