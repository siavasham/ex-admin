import React,{useRef,useEffect ,useState} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import difference from "lodash/difference";
import Spinner from "component/spinner";

const animatedComponents = makeAnimated();

export default function AnimatedMulti({ from, id }) {
    const { setting: { token } , session , setSession} = useStorage();
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [option, setOption] = useState([]);

    const to = from == 'asset' ? 'network' : 'asset';
    useEffect(() => {
        const temp = [];
        for (let i in session?.[to])
            temp.push({ value: i, label:  session?.[to][i] })
        setOption(temp);
        const where = JSON.stringify({ [from]: id });
        post("list", { token, pageSize: 1000, table: 'assetNetwork', where }).then((res) => {
            if (res?.message == 'Success') {
                setLoading(false)
                const temp = [];
                for (let i of res.data.list) {
                    temp.push(i[to]);
                }
                setList(temp)
            }
        });
    }, []);

    const selectedOption = (data)=>{
        const temp = [];
        for (let i of data??[])
            temp.push(i.value);
        
        let remove = difference(list, temp)
        let add = difference(temp, list)
        if (add.length > 0) {
            post("add", {
                token,
                data: JSON.stringify({
                    [from]: id,
                    [to] : add[0]
                }),
                table: 'assetNetwork'
              })
        }
        if (remove.length > 0) {
            const where = JSON.stringify({ [from]: id , [to] : remove[0]});
            post("delete", {
                token,
                where,
                table: 'assetNetwork'
            })
        }
        setList(temp)
    }
    const values = option.filter(e => list.includes(+e.value));

    return (
        <div className="py-4 px-2 bg-detail min" >
            {loading
                ?
                <Spinner forDiv />
                :
                <>
                <p className="font-weight-bold">{t(to + 's list')} :</p>
                <Select
                    placeholder={t('select ' + to)}
                    classNamePrefix="multi"
                    className="asset-netwotk"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    value={values}
                    onChange={selectedOption}
                    isMulti
                    options={option}
                />
            </>
            }
      </div>
  );
}