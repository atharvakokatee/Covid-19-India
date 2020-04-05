

$.getJSON('./static/data.json', function(data){
  
  var final=[['State','Confirmed']]
  for(let i=0;i<data.length;i++){
    var temp = []
    if(data[i].state == "Chhattishgarh"){
      temp.push("Chhattisgarh");
    } else if(data[i].state == "Odisha"){
      temp.push("Orissa");
    } else if(data[i].state == "Puduchery"){
      temp.push("Puducherry");
    } else if(data[i].state == "UT of J&K"){
      temp.push("Jammu and Kashmir");
    } else if(data[i].state == "Uttarakhand"){
      temp.push("IN-UT");
    } else{
      temp.push(data[i].state);
    }
    temp.push(Number(data[i].confirmed));
    final.push(temp);    
  }
  console.log(final);
  google.charts.load('current', {
    'packages':['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
  });
  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable(final);

    var options = {
        region: 'IN',
        domain: 'IN',
        resolution: 'provinces',
        displayMode: 'regions',
        colorAxis:{colors:['rgb(63,224,208)','rgb(0,136,169)']},
        explorer: { 
          actions: ['dragToZoom', 'rightClickToReset'],
          axis: 'horizontal',
          keepInBounds: true,
          maxZoomIn: 4.0
  }
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
  }

  $(window).resize(function(){
    drawRegionsMap();
  });
  var tbody = document.querySelector("tbody");
  console.log(tbody);
  for(let i=0;i<data.length;i++){
    let row = tbody.insertRow();
    let state = row.insertCell();
    let confirmed = row.insertCell();
    let recovered = row.insertCell();
    let deaths = row.insertCell();
    let state_text = document.createTextNode(data[i].state);
    let confirmed_text = document.createTextNode(data[i].confirmed);
    let recovered_text = document.createTextNode(data[i].recovered);
    let deaths_text = document.createTextNode(data[i].deaths);
    state.appendChild(state_text);
    confirmed.appendChild(confirmed_text);
    recovered.appendChild(recovered_text);
    deaths.appendChild(deaths_text);
  }

});

// ['IN-AN', 'IN-AP','IN-AR','IN-AS','IN-BR','IN-CH','IN-CT','IN-DL',
// 'IN-GA','IN-GJ','IN-HR','IN-HP','IN-JH','IN-KA','IN-KL','IN-MP',
// 'IN-MH','IN-MN','IN-MZ','IN-OR','IN-PY','IN-PB','IN-RJ','IN-TN','IN-TG',
// 'IN-JK','IN-UP','IN-UT','IN-WB']

// ['State Code', 'State', 'Temperature'],     
// [ 'IN-UP','Uttar Pradesh', 33],
// ['IN-MH','Maharashtra', 32],
// ['IN-BR','Bihar', 31],
// ['IN-WB','West Bengal', 32],
// ['IN-MP','Madhya Pradesh', 30],
// ['IN-TN','Tamil Nadu', 33],
// ['IN-RJ','Rajasthan', 33],
// ['IN-KA','Karnataka', 29],
// ['IN-GJ','Gujarat', 34],
// ['IN-AP','Andhra Pradesh', 32],
// ['IN-OR','Orissa', 33],
// ['IN-TG','Telangana', 33],
// ['IN-KL','Kerala', 31],
// ['IN-JH','Jharkhand', 29],
// ['IN-AS','Assam', 28],
// ['IN-PB','Punjab', 30],
// ['IN-CT','Chhattisgarh', 33],
// ['IN-HR','Haryana', 30],
// ['IN-JK','Jammu and Kashmir', 20],
// ['IN-UT','Uttarakhand', 28],
// ['IN-HP','Himachal Pradesh', 17],
// ['IN-TR','Tripura', 31],
// ['IN-ML','Meghalaya', 21],
// ['IN-MN','Manipur', 22],
// ['IN-NL','Nagaland', 22],
// ['IN-GA','Goa', 32],
// ['IN-AR', 'Arunachal Pradesh', 33],
// ['IN-MZ','Mizoram', 23],
// ['IN-SK','Sikkim', 24],
// ['IN-DL','Delhi', 31],
// ['IN-PY','Puducherry', 33],
// ['IN-CH','Chandigarh', 30],
// ['IN-AN','Andaman and Nicobar Islands', 30],
// ['IN-DN','Dadra and Nagar Haveli', 30],
// ['IN-DD','Daman and Diu', 29],
// ['IN-LD','Lakshadweep', 31]
// ]);



