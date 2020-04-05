from flask import Flask, request, render_template
from bs4 import BeautifulSoup
import requests
import json

# URL = "https://economictimes.indiatimes.com/news/politics-and-nation/coronavirus-crisis-heres-total-number-of-confirmed-cases-in-india-as-per-health-ministry/articleshow/74589499.cms"
URL="https://www.mohfw.gov.in/"
app = Flask(__name__)

@app.route('/home')
def index():
    with open('static/data.json') as f:
        data = json.load(f)
    # print(data)    
    return render_template('index.html', generate_data = generate_data(), json_data = data)

def generate_data():
    result = requests.get(URL)
    src = result.content
    soup = BeautifulSoup(src, 'html5lib')

    tag = soup.find_all('tr')
    data = []
    final_stats=[]
    stat = soup.find_all('div',{"class": "status-update"})[0].find('h2').find('span').string
    print(stat)
    final_stats.append(stat)
    for i in range(1,len(tag)-1):
        if(i<len(tag)-2):
            statewise_data = tag[i].find_all('td')
            # print(statewise_data)
            value = {
                'state' : statewise_data[1].string,
                'confirmed' : statewise_data[2].string,
                'recovered' : statewise_data[3].string,
                'deaths' : statewise_data[4].string
            }
            data.append(value)
            with open('static/data.json', 'w') as fp:
                json.dump(data, fp)
        else:
            # india_confirmed_statement = tag[i].find_all('td')[0].find_all('strong')[0].string
            india_confirmed = tag[i].find_all('td')[1].find_all('strong')[0].string
            india_recovered = tag[i].find_all('td')[2].find_all('strong')[0].string
            india_deaths = tag[i].find_all('td')[3].find_all('strong')[0].string
            # final_stats=[india_confirmed,india_recovered,india_deaths]
            final_stats.append(india_confirmed[:-1])
            final_stats.append(india_recovered)
            final_stats.append(india_deaths)
            print(final_stats)  
            return final_stats      
       

if __name__ == "__main__":
    app.run(debug=True)