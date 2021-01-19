import pytest
import app

from db import db
from flask import json

@pytest.fixture
def client():
    client = app.app.test_client()
    app.app.config['TESTING'] = True
    app.app.config['SQALCHEMY_TRACK_MODIFICATIONS'] = False 
    db.init_app(app.app)
    client.post('/register', json={"username": "TestUser", "password": "TestPass"})
    rv = client.post('/login', json={"username": "TestUser", "password": "TestPass"})
    json = rv.get_json()
    setup_token = json["access_token"]
    client.delete('/user', headers={"Authorization" : f"Bearer {setup_token}"})
    client.post('/register', json={"username": "TestUser1", "password": "TestPass"})
    rv = client.post('/login', json={"username": "TestUser1", "password": "TestPass"})
    json = rv.get_json()
    setup_token2 = json["access_token"]
    client.delete('/user', headers={"Authorization" : f"Bearer {setup_token2}"})
    yield client

def test_post(client):
    #http://localhost:5000/table
    hay_data = 
            """[
                ["5% Alfalfa", "No Rain", (5).toFixed(0), "$ "+(125.00).toFixed(2)],
                ["30% Alfalfa", "No Rain", (39).toFixed(0), "$ "+(120.00).toFixed(2)],
                ["5% Alfalfa", "Some Rain", (0).toFixed(0), "$ "+(100.00).toFixed(2)],
                ["30% Alfalfa", "Some Rain", (0).toFixed(0), "$ "+(95.00).toFixed(2)],
                ["5% Alfalfa", "Heavy Rain", (0).toFixed(0), "$ "+(20.00).toFixed(2)],
                ["30% Alfalfa", "Heavy Rain", (0).toFixed(0), "$ "+(20.00).toFixed(2)]
            ]"""
    rv = client.post('/table', json={
                                    "table_name": "hay", 
                                    "table_headers": "['Hay Type', 'Bale Quality', 'Availability', 'Price/Bale']",
                                    "table_data": f"{hay_data}"
                                    }
                    )
    json = rv.get_json()
    assert(json["message"] == "Table hay created successfully.")
                    
def test_get(client):
    #http://localhost:5000/table
    rv = client.get('/table', json={"table_name":"hay"})
    json = rv.get_json()
    assert("table_name" in json)