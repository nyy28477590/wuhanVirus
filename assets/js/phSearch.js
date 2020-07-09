function phSearch() {
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

        var today = new Date();
        var hours = today.getHours();
        var GetDateDiff = DateDiff(today, "2020/3/12 12:00:00");
        var GetDateDiff1 = DateDiff(today, "2020/3/12");
        console.log(GetDateDiff);
        console.log(today);

        console.log(hours);
        if(hours>12) {
          document.getElementById("searchDate").max = getDay(today,-1);
        } else {
          document.getElementById("searchDate").max = getDay(today,-2);
        }
        

        if(GetDateDiff1 > GetDateDiff) {
          document.getElementById('div1').innerText='The day before yesterday';
          document.getElementById('div2').innerText=getDay(today,-2);
        } else {
          document.getElementById('div1').innerText='Yesterday';
          document.getElementById('div2').innerText=getDay(today,-1);
        }

        var prevGetDateDiff = parseInt(Math.abs(GetDateDiff)-1);
        console.log(prevGetDateDiff);
        
      
        $.get('https://spreadsheets.google.com/feeds/list/1JN5q1UNfnKUnAkjh08ozAsPL6Bl6pWx0fmJSbo5rBHY/'+ prevGetDateDiff +'/public/values?alt=json', function(data) {
            var dd = data.feed.entry;
            //var cases = gsx$confirmedadmitted.$t+gsx$confiremedreconeries.$t+gsx$confirmeddeats.$t;

        $.get('https://spreadsheets.google.com/feeds/list/1JN5q1UNfnKUnAkjh08ozAsPL6Bl6pWx0fmJSbo5rBHY/'+ GetDateDiff +'/public/values?alt=json', function(data){
          var d = data.feed.entry;
          var items = [];
          for (var i=0; i<d.length; i++) {
            var item = {};
            item.city = d[i].gsx$city.$t;
            item.case = parseInt(d[i].gsx$confirmedadmitted.$t) + parseInt(d[i].gsx$confiremedreconeries.$t) + parseInt(d[i].gsx$confirmeddeats.$t);
            item.diff = parseInt(d[i].gsx$confirmedadmitted.$t) + parseInt(d[i].gsx$confiremedreconeries.$t) + parseInt(d[i].gsx$confirmeddeats.$t) - (parseInt(dd[i].gsx$confirmedadmitted.$t) + parseInt(dd[i].gsx$confiremedreconeries.$t) + parseInt(dd[i].gsx$confirmeddeats.$t));
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
          //console.log(d[18].gsx$cases.$t);
          console.log(items.length);
          document.getElementById("div3").innerText=parseInt(d[d.length-1].gsx$confirmedadmitted.$t) + parseInt(d[d.length-1].gsx$confiremedreconeries.$t) + parseInt(d[d.length-1].gsx$confirmeddeats.$t);
          document.getElementById("div4").innerText=parseInt(d[d.length-1].gsx$confirmedadmitted.$t) + parseInt(d[d.length-1].gsx$confiremedreconeries.$t) + parseInt(d[d.length-1].gsx$confirmeddeats.$t) - (parseInt(dd[d.length-1].gsx$confirmedadmitted.$t) + parseInt(dd[d.length-1].gsx$confiremedreconeries.$t) + parseInt(dd[d.length-1].gsx$confirmeddeats.$t));
          for(var i=1; i<items.length; i++) {
            var Card = `
            <div class="card">
              <div class="info">
                <h4>${items[i].city}</h4>
                <h4>${items[i].case}</h4>
                <p>new cases:${items[i].diff}</p>
            </div>
          </div>`
          ;
          $('.js-append-card').append(Card);
          }

          
          var addCases = [];
          const addCase = _.groupBy(items, "diff");
          delete addCase[0];
          for (i in addCases) {
            addCases.push(addCase);
          }
          console.log(addCases[0]);
          console.log(addCases[0][9]);
          console.log(Object.keys(addCases[0]));
          console.log(Object.keys(addCases[0][1]));
          console.log(addCases[0][1][1]);
          console.log(addCases[0][1][0]);
          console.log(addCases[0][9][0]);
          console.log(addCases[0][11][0]);
          console.log(addCases[0][1].length);
          var dailycase = parseInt(d[d.length-1].gsx$confirmedadmitted.$t) + parseInt(d[d.length-1].gsx$confiremedreconeries.$t) + parseInt(d[d.length-1].gsx$confirmeddeats.$t) - (parseInt(dd[d.length-1].gsx$confirmedadmitted.$t) + parseInt(dd[d.length-1].gsx$confiremedreconeries.$t) + parseInt(dd[d.length-1].gsx$confirmeddeats.$t));
          var key = Object.keys(addCases[0]);
          console.log("key:"+key[0]);
          /*
          if(dailycase != 0) {
              for(var i=1; i<=6; i++) {
                  for(var j=1; j<=6; j++) {
                      document.getElementById("div5").innerHTML += i + "x" + j + "=" + (i*j) + '\t';
                  }
                  document.getElementById("div5").innerHTML += '\n';
              }
          }
          */

          if(dailycase != 0) {
            for(var i in key.pop()) {
              for(var j=0; j<addCases[0][key[i]].length; j++) {
                  document.getElementById("div5").innerHTML += addCases[0][key[i]][j].city+"+"+addCases[0][key[i]][j].diff+"case(s)<br>";
              }
            }
          } else {
            document.getElementById("div5").innerHTML = "無新增病例";
          }
        
      });
    })
  });
}