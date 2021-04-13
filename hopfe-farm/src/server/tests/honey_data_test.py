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
    yield client
    client.post('/register', json={"username": "TestUser", "password": "TestPass"})
    rv = client.post('/login', json={"username": "TestUser", "password": "TestPass"})
    json = rv.get_json()
    setup_token = json["access_token"]
    client.delete('/user', headers={"Authorization" : f"Bearer {setup_token}"})

def test_post(client):
    #http://localhost:5000/createhoney
    client.post('/register', json={"username": "TestUser", "password": "TestPass"})
    rv = client.post('/login', json={"username": "TestUser", "password": "TestPass"})
    json = rv.get_json()
    token = json["access_token"]

    rv = client.post('/createhoney', json={
                                        "HoneyType": "TestType",
                                        "HoneySize": 1,
                                        "Quantity": 1,
                                        "Price": 1000.00
                                    },
                                    headers={"Authorization" : f"Bearer {token}"}
                    )
    json = rv.get_json()
    assert(rv.status_code == 201)
    assert(json["message"] == "Data added successfully.")