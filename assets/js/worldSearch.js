function worldSearch() {
    var day = document.querySelector('input[type="date"]');
    var searchdate = day.value;
    var searchdate = new Date(searchdate);
    searchdate.setDate(searchdate.getDate()+1);
    //console.log(searchdate);

        $(function(){
          var DateDiff = function (sDate1, sDate2) {
            var oDate1 = new Date(sDate1);
            var oDate2 = new Date(sDate2);
            var iDays =
            parseInt(Math.abs(oDate1 - oDate2)/1000/60/60/24);
            return iDays;
          };

          var today = new Date();
          var GetDateDiff1 = DateDiff(searchdate, "2020/3/13");
          //console.log(GetDateDiff1);
          //console.log(searchdate);

          document.getElementById('div1').innerText='';
          document.getElementById('div2').innerText=getDay(searchdate,-1);

          var prevGetDateDiff = parseInt(Math.abs(GetDateDiff1)-1);
          //console.log(prevGetDateDiff);
          
        
          $.get('https://spreadsheets.google.com/feeds/list/1CeBLo5LxhboETXcs4I6PGGoLGjo0wj9c9DKldWhq-fY/'+ prevGetDateDiff +'/public/values?alt=json', function(data) {
              var dd = data.feed.entry;

          $.get('https://spreadsheets.google.com/feeds/list/1CeBLo5LxhboETXcs4I6PGGoLGjo0wj9c9DKldWhq-fY/'+ GetDateDiff1 +'/public/values?alt=json', function(data){
            var d = data.feed.entry;
            //console.log(d.length);
            var items = [];
            for (var i=0; i<d.length; i++) {
              var item = {};
              item.country = d[i].gsx$country.$t;
              item.case = d[i].gsx$cases.$t;
              item.death = d[i].gsx$death.$t;
              items.push(item);
            }
            //照案例數排序
            function compare(p) {
                return function(m,n){
                  var a = m[p];
                  var b = n[p];
                  return b - a;
                }
              }
              items.sort(compare('case'));
            //console.log(d[22].gsx$cases.$t);
            //console.log(items);
            //console.log(dd[d.length-1].gsx$cases.$t);
            document.getElementById("div3").innerText=d[d.length-1].gsx$cases.$t;
            document.getElementById("div4").innerText=d[d.length-1].gsx$cases.$t - dd[dd.length-1].gsx$cases.$t;
            document.getElementById("death").innerHTML=d[d.length-1].gsx$death.$t;
            document.getElementById("deathdiff").innerHTML=d[d.length-1].gsx$death.$t - dd[dd.length-1].gsx$death.$t;
            for(var i=1; i<items.length; i++) {
                document.getElementById("div5").innerHTML += "<tr><td>"+i+"</td> <td>"+items[i].country+"</td> <td>"+items[i].case+"</td><td>"+items[i].death+"</td><td>"+percentNum(items[i].death,items[i].case)+"</td></tr>";
            }
        });
      })
    })
};