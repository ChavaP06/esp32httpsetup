const { json } = require("body-parser");
const express = require("express");
const router = express.Router();

var state = {
  prevRowCount: 0,
  rowCount: 1,
  prevAlarmRowCount: 0,
  alarmRowCount: 1,
  prevProdRowCount: 0,
  prodRowCount: 1,
  data: [{ id: 1, values: ["", "", "0"] }],
  alarmData: [{ id: 1, values: ["", "", "1"] }],
  prodData: [{ id: 1, values: ["", "", "2"] }],
};

router.post("/saveTable", (req, res) => {
  //console.log(req.body)
  //console.log(JSON.stringify(req.body, null, 2))
  state = req.body;
  //console.log(state);
  res.json({ result: "OK" });
});

router.get("/getTable", (req, res) => {
  res.json(state);
});

router.get("/getTableData", (req, res) => {
  //console.log(state.data.length)
  //console.log(state.data)
  // let concate = ""
  // let test
  // for(let i = 0; i < state.data.length;i++){
  //     //console.log(state.data[i].id)

  //     if(i == 0){

  //         test = state.data[i].values.toString().split(',')
  //         let combine = ""
  //         for(let j = 0; j < test.length;j++){
  //             if(j == 0){
  //                 //console.log(test[j].length)
  //                 if(test[j].length == 2){
  //                     test[j] = test[j] + "^,"
  //                 }
  //             }else{
  //                 if(test[j]==''){
  //                     test[j] = test[j] + "^,"
  //                 }
  //             }
  //             combine = combine + test[j]
  //         }
  //         concate = state.rowCount + "/" + combine
  //         console.log(concate)

  //     }else{
  //         concate = concate +"*" + state.data[i].values.toString()

  //     }

  // }

  //console.log(test)
  // console.log(concate)

  //console.log(concate)
  // console.log(state.data); console.log("from status")
  // console.log(state.alarmData);console.log("from alarm") 
  // console.log(state.prodData);console.log("from prod")
  let test = state.data.concat(state.alarmData).concat(state.prodData)
  //console.log(test)
  res.json(test);
});

module.exports = router;
