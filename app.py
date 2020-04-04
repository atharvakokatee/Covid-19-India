from flask import Flask, request, render_template
from bs4 import BeautifulSoup
import requests
import json

URL = "https://economictimes.indiatimes.com/news/politics-and-nation/coronavirus-crisis-heres-total-number-of-confirmed-cases-in-india-as-per-health-ministry/articleshow/74589499.cms"

app = Flask(__name__)

@app.route('/home')
def index():
    with open('static/data.json') as f:
        data = json.load(f)
    print(data)    
    return render_template('index.html', generate_data = generate_data(), json_data = data)

def generate_data():
    result = requests.get(URL)
    src = result.content
    soup = BeautifulSoup(src, 'html5lib')

    tag = soup.find_all('tr')
    data = []
    for i in range(1,len(tag)):
        statewise_data = tag[i].find_all('td')
        value = {
            'state' : statewise_data[0].string,
            'confirmed' : statewise_data[1].string,
            'recovered' : statewise_data[2].string,
            'deaths' : statewise_data[3].string
        }
        data.append(value)
        with open('static/data.json', 'w') as fp:
            json.dump(data, fp)

if __name__ == "__main__":
    app.run(debug=True)