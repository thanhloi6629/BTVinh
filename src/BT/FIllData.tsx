import React from 'react';
const FIllData = () =>  {
  const obj = [{ name: '1', code: 'C', value: '' },
  { name: '2', code: 'A', value: 'DATA' },
  { name: '3', code: 'A', value: 'DATA' },
  { name: '3', code: 'K', value: 'DATA' },
  { name: '3', code: 'M', value: 'DATA' },
  { name: '3', code: 'D', value: 'DATA' },
  { name: '4', code: 'B', value: 'DATA' },
  { name: '4', code: 'H', value: 'DATA' },
  { name: '5', code: 'F', value: 'DATA' },
  { name: '6', code: 'E', value: 'DATA' },
  { name: '7', code: 'G', value: 'DATA' },
  { name: '8', code: 'B', value: 'DATA' },
  { name: '8', code: 'M', value: 'DATA' },
  { name: '8', code: 'B', value: 'DATA' },
  { name: '8', code: 'C', value: 'DATA' },
  ]

  const objSoft = obj.sort((a, b) => (b.code < a.code) ? 1 : (b.code > a.code) ? -1 : 0);

  const codes = objSoft.map((x) => x.code);
  //remove doublicate array
  const header = codes.filter((item, index) => codes.indexOf(item) == index)

  const names = objSoft.map((x) => x.name).sort((a, b) => Number(a) - Number(b));
  //remove doublicate array
  const bodyLeft = names.filter((item, index) => names.indexOf(item) == index)


//   console.log("ubi", header);
//   console.log("ubi", bodyLeft);



  const getData = (rowIndex: any, colIndex: any)=>{
   const result = obj.find((i) => i.name === rowIndex  && i.code === colIndex)
    return result?.value
  };
 


  return (
    <div>
      <table>
        <thead >
          <tr>
            <th rowSpan={2}></th>
            <th colSpan={header.length}></th>
          </tr>
          <tr>
            {header.map((item) => (
              <th>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            bodyLeft.map((itemRow) => (
              <tr>
                <td>{itemRow}</td>
                {
                  header.map((itemCol) => 
                    (
                      <td>
                        <div onClick={() => console.log(itemRow, itemCol, 'position')}>
                        {getData(itemRow,itemCol )}
                        </div>
                      </td>
                    )
                  )
                }
              </tr>
            ))
          }

        </tbody>
      </table>
    </div>
  );
}

export default FIllData;
