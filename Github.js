var list = ["浙江","杭州","上海","江苏"];
const url = "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5";
var ala="";
function nowtime(){
 let now = new Date();
 let time = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
 return time
}
function num(location, result) {
  var loc = location;
  var resu = result;
  var loc_new = new RegExp(loc + "[\\s\\S]*?confirm[\\s\\S]{3}(\\d+)");
  var loc_now = new RegExp(loc + "[\\s\\S]*?nowConfirm[\\s\\S]{3}(\\d+)");
  let loc_new_res = loc_new.exec(resu);
  let loc_now_res = loc_now.exec(resu);
  if (loc_new_res) {
    //console.log("已获取" + loc + "的信息");
    ala = ala +loc +"   :   " +loc_new_res[1].padStart(5,"\u0020")+":"+loc_now_res[1].padStart(5,"\u0020")+ "\n";
  } else {
    //console.log("获取" + loc + "的信息失败");
    ala = ala + loc + "   :   查无数据\n";
  }
};
$httpClient.get(url, function(error, response, data){
  let res = data;
  for (var i = 0; i < list.length; i++) {
    num(list[i], res);
    if (i == list.length - 1) {
     $done({
       title: " 😷   :   新增 | 现存"+ "   "+nowtime(),
       icon:"line.3.crossed.swirl.circle.fill",
       "icon-color":"#afdd22",
       content: ala.replace(/\n$/, "")
     });
    }
  }
});
