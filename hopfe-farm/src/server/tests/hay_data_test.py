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
    #http://localhost:5000/createhay
    client.post('/register', json={"username": "TestUser", "password": "TestPass"})

    rv = client.post('/login', json={"username": "TestUser", "password": "TestPass"})
    json = rv.get_json()
    assert("access_token" in json)
    assert(rv.status_code == 200)

    token = json["access_token"]

    rv = client.post('/createhay', json={
                                    "HayType": "test type", 
                                    "BaleQuality": "Some Rain",
                                    "Quantity": 100,
                                    "Price": 200.00
                                    },
                    headers={"Authorization" : f"Bearer {token}"}
    )
    json = rv.get_json()
    assert(json["message"] == "Data added successfully.")
                    
def test_put(client):
    #http://localhost:5000/createhay
    client.post('/register', json={"username": "TestUser1", "password": "TestPass"})

    rv = client.post('/login', json={"username": "TestUser1", "password": "TestPass"})
    json = rv.get_json()
    assert("access_token" in json)
    assert(rv.status_code == 200)

    token = json["access_token"]

    rv = client.put('/createhay', json={
                                    "HayType": "test type",
                                    "BaleQuality": "Some Rain",
                                    "Quantity": 100,
                                    "Price": 200.00,
                                    "NewHayType": "new test type",
                                    "NewBaleQuality": "No Rain"
                                    },
                    headers={"Authorization" : f"Bearer {token}"}
    )
    json = rv.get_json()
    assert(json["message"] == "Hay entry updated successfully.")