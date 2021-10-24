from flask import Flask
import pandas as pd
import json

app = Flask(__name__)

@app.route("/data")
def hello_world():
    #Read in data from csv
    df = pd.read_csv("data.csv")

    #Convert dataframe to json
    result = df.to_json(orient="records")
    parsed = json.loads(result)
    data = json.dumps(parsed, indent=4)  

    return data
