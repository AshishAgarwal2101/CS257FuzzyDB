const BASE_URL = "http://localhost:3001";


const displayTable = (tableName, objArr) => {
    if(!objArr || objArr.length === 0) return <></>
    let keys = Object.keys(objArr[0]);
    return (
        <div>
            <h2>{tableName.toUpperCase()}</h2>
            <table>
                <tr>{keys.map((key) => <th>{key}</th>)}</tr>
                {objArr.map((obj) => {
                    return <tr>{keys.map((key) => <td>{obj[key]}</td>)}</tr>
                })}
            </table>
        </div>
    )
};

const displayTableForSearch = (json) => {
    if(!json) return <div></div>
    const baseKeys = Object.keys(json);
    console.log("Json: ", json);
    return <>
        {
            baseKeys.map((tableName) => {
                let objArr = json[tableName];
                return displayTable(tableName, objArr);
            })
        } 
    </>
};

const getSimpleBox = (str) => {
    return <span className="simple-box">
        {str}
    </span>
}

export {
    BASE_URL,
    displayTableForSearch,
    displayTable,
    getSimpleBox
}