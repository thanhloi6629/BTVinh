import React from 'react'
import listMenu from './list'
import { IInputTree } from './type';

const FunctionJs = () => {

    console.log('T1-listMenu', listMenu);

    function convertList(inputList: any) {
      const itemMap: Record<any, any> = {};
      const roots: any[] = [];
      inputList.forEach((element: any) => {
        itemMap[element.id] = {...element, children: []}
      });
      inputList.forEach((element: any) => {
        if(element.parentId){
          itemMap[element.parentId].children.push(itemMap[element.id]); 
        }
        else {
          roots.push(itemMap[element.id])
        }
      });

      return roots;
    }
    const listOutput = convertList(listMenu);
    console.log("T1-listOutput", listOutput);
  
  const listInput = [
      // Your listInput items here
  ];


  const convertListV2 = (list: IInputTree[]) => {
    const outPut: any[] = [];
    const listMap = JSON.parse(JSON.stringify(list)) as IInputTree[];
    console.log("list", list);
    console.log("listMap", listMap);
    const groupDataLevel = listMap.reduce((result: Record<number, IInputTree[]>, item: IInputTree) => {
      result[item.level] = [...(result[item.level] || []), item];
      return result;
    }, {});
    console.log("T2", groupDataLevel);
    
    const recursiveChildren = (value: any, level: number) => {
      value.children = [];
      if (!groupDataLevel[level]) {
        return value;
      }
      groupDataLevel[level]?.map((subValue) => {
        if (subValue.parentId === value.id) {
          value.children.push(subValue);
          recursiveChildren(subValue, level + 1);
        }
      });
      return value;
    };

    groupDataLevel['1']?.map((item) => {
      const level = 1;
      const result = recursiveChildren(item, level + 1);
      outPut.push(result);
    });
    return outPut;
  };

  

  const listOutputV2 = convertListV2(listMenu);
  console.log("T1-listOutputV2", listOutputV2);
  


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



      // loai bỏ phẩn tử trùng nhau trong Mang object
 



      const array1 = [
        {id: 1, name: "Loi", age: 17},
        {id: 2, name: "A", age: 25},
        {id: 3, name: "B", age: 22},
        {id: 3, name: "C", age: 27},
        {id: 3, name: "D", age: 32},
        {id: 4, name: "E", age: 25},
        {id: 5, name: "F", age: 25 },
        {id: 5, name: "G", age: 25}
        
    ];
    

    const object = new Set(array1.map(item => item.age))
    console.log("object", object) //
    const object_distict = Array.from(object);
    console.log("object_distict", object_distict); 

    const removeArrObj = Array.from(new Set(array1.map(item => item.age)));
    console.log('removeArrObj', removeArrObj);
    



    //loai bo phan tử id trùng nhau
  
  const b = Array.from(new Set(array1.map(x => x.id)));
  console.log('b', b);
    const result = Array.from(new Set(array1.map(x => x.id)))
                    .map((id: any) => {
                        return {
                            id: id,
                            name: array1.find((item) => item.id === id)?.name,
                            age: array1.find(s => s.id === id)?.age
                        };
                    });
    

  const removeItem = array1.filter((obj, index, self) => index === self.findIndex(x => x.id === obj.id));

  console.log('RM-removeItem', removeItem);
  
  
  const first_person = {
    name: "Jack",
    age: 24,
  }
  
  const second_person = first_person;

  second_person.age = 25;
  
  console.log('fist',first_person.age); // output: 25
  console.log('second',second_person.age); // output: 25

  let list = [1, 2, 3, 4, 5, 6, 7];


  const listToTree = (list: any) =>{
    if (list.length === 0) {
      return null;
    }
  
    let midIndex = Math.floor(list.length / 2);
    const root: any = {
      value: list[midIndex],
      left: listToTree(list.slice(0, midIndex)),
      right: listToTree(list.slice(midIndex + 1))
    };
  
    return root;
  }
  
  let tree = listToTree(list);
  console.log("tree", tree);

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
