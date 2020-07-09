function search() {
    var day = document.querySelector('input[type="date"]');
    var searchdate = day.value;
    var searchdate = new Date(searchdate);
    searchdate.setDate(searchdate.getDate()+1);
    console.log(searchdate);

    /*
    var del = ["card", "div5", "totalCard"];
    for(i in del) {
      document.getElementById[1].innerHTML="";
    }
    */

    /*var delist = ["div5"];
    for (i in delist) {
      var del = document.getElementById(delist[i]);
      del.innerHTML="";
    }*/
    //document.getElementById("div5").innerHTML="";
    
    

    $(function(){
        var DateDiff = function (sDate1, sDate2) {
          var oDate1 = new Date(sDate1);
          var oDate2 = new Date(sDate2);
          var iDays =
          parseInt(Math.abs(oDate1 - oDate2)/1000/60/60/24);
          return iDays;
        };

        $(function(){
          var DateDiff = function (sDate1, sDate2) {
            var oDate1 = new Date(sDate1);
            var oDate2 = new Date(sDate2);
            var iDays =
            parseInt(Math.abs(oDate1 - oDate2)/1000/60/60/24);
            return iDays;
          };

          var today = new Date();
          var GetDateDiff1 = DateDiff(searchdate, "2020/3/5");
          console.log(GetDateDiff1);
          console.log(searchdate);

          document.getElementById('div1').innerText='';
          document.getElementById('div2').innerText=getDay(searchdate,-1);
          /*
          if(GetDateDiff1 > GetDateDiff) {
            document.getElementById('div1').innerText='前天';
            document.getElementById('div2').innerText=getDay(searchdate,-2);
          } else {
            document.getElementById('div1').innerText='昨日';
            document.getElementById('div2').innerText=getDay(searchdate,-1);
          }
          */

          var prevGetDateDiff = parseInt(Math.abs(GetDateDiff1)-1);
          console.log(prevGetDateDiff);
          
        
          $.get('https://spreadsheets.google.com/feeds/list/1Mx_bRLC8g5xogEw-eXPzynAQ3Zk8K9GU0aV2Uoq4PiE/'+ prevGetDateDiff +'/public/values?alt=json', function(data) {
              var dd = data.feed.entry;

          $.get('https://spreadsheets.google.com/feeds/list/1Mx_bRLC8g5xogEw-eXPzynAQ3Zk8K9GU0aV2Uoq4PiE/'+ GetDateDiff1 +'/public/values?alt=json', function(data){
            var d = data.feed.entry;
            var items = [];
            for (var i=0; i<23 ; i++) {
              var item = {};
              item.city = d[i].gsx$city.$t;
              item.case = d[i].gsx$cases.$t;
              item.diff = d[i].gsx$cases.$t - dd[i].gsx$cases.$t;
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
            document.getElementById("div3").innerText=d[22].gsx$cases.$t;
            document.getElementById("div4").innerText=d[22].gsx$cases.$t - dd[22].gsx$cases.$t;
            console.table(items);
            for(var i=1; i<22 ; i++) {
              var Card = `
              <div class="card">
                <div class="info">
                  <h3>${items[i].city}</h3>
                  <h3>${items[i].case}</h3>
                  <p>較前一日新增${items[i].diff}例</p>
              </div>
            </div>`
            ;
            $('.js-append-card').append(Card);
            }

            var addCases = []
            const addCase = _.groupBy(items, "diff");
            delete addCase[0];
            for (i in addCases) {
              addCases.push(addCase);
            }
            console.log(addCases)
            var dailycase = d[22].gsx$cases.$t-dd[22].gsx$cases.$t;
            var key = Object.keys(addCases[0]);

            if(dailycase != 0) {
              for(var i in key) {
                for(var j=0; j<addCases[0][key[i]].length; j++) {
                    document.getElementById("div5").innerHTML += addCases[0][key[i]][j].city+"+"+addCases[0][key[i]][j].diff+"例<br>";
                }
              }
            } else {
              document.getElementById("div5").innerHTML = "無新增病例";
            }
            
        });
      })
    });
})
}