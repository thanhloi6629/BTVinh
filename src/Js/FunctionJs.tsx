import { any } from 'prop-types';
import React, { Children } from 'react'

const FunctionJs = () => {
    var options = [
        { name: 'One', assigned: true }, 
        { name: 'Two', assigned: false }, 
        { name: 'Three', assigned: true },
        { name: 'Three', assigned: true }, 
      ];

        // 1. Loại bỏ dòng trùng nhau trong mảng: 3 cách
        const year = [2010, 2012, 2010, 2017, 2015, 2010];

        const distinct = (value: any, index: any, self: Array<any>) => {
            return self.indexOf(value) === index; 
        }
        const distinct1 = year.filter(distinct);
        console.log("distinct1", distinct1);

        const obj = new Set(year); //object đã loại bỏ trùng nhau
        const distinct2 = Array.from(obj); 
        console.log("distinct2", distinct2); // convert thành mảng

        const distinct3 = year.reduce((unique: any, item: any)=> unique.includes(item)? unique : [...unique, item],[]);
        console.log("distinct3", distinct3); 

        //Kết quả: [2010, 2012, 2017, 2015]

      // loai bỏ phẩn tử trùng nhau trong object
      const array = [
        {"name": "Loi", "age": 17},
        {"name": "Hau", "age": 25},
        {"name": "em yeu", "age": 22},
        {"name": "anh yeu", "age": 25}
      ];

      const object = new Set(array.map(item => item.age))
      const object_distict = Array.from(object);
      console.log("object_distict", object_distict); // [17, 25, 22]


      const array1 = [
        {id: 1, name: "Loi", age: 17},
        {id: 2, name: "Hau", age: 25},
        {id: 3, name: "em yeu", age: 22},
        {id: 3, name: "em yeu", age: 27},
        {id: 3, name: "em yeu", age: 32},
        {id: 4, name: "anh yeu", age: 25}
    ];
    //loai bo phan tử id trùng nhau
    const result = Array.from(new Set(array1.map(x => x.id)))
                    .map((id: any) => {
                        return {
                            id: id,
                            name: array1.find((item) => item.id === id)?.name,
                            age: array1.find(s => s.id === id)?.age
                        };
                    });
    
    console.log("result",result);
    // {id: 1, name: "Loi", age: 17},
    // {id: 2, name: "Hau", age: 25},
    // {id: 3, name: "em yeu", age: 22},
    // {id: 4, name: "anh yeu", age: 25}


    const getDatesBetweenDates = (startDate: any, endDate: any) => {
      let dates: any = [];
  
      const theDate = new Date(startDate);
      while (theDate < new Date(endDate)) {
        dates = [...dates, new Date(theDate)];
        theDate.setDate(theDate.getDate() + 1);
      }
      return dates;
    };
  
    // const listDate = getDatesBetweenDates(targetDateFrom, targetDateTo);

  return (
    <div>
      <button>click</button>
    </div>
  )
}

export default FunctionJs
