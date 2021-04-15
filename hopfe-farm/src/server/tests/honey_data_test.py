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
    client.delete('/honeytest', json={"HoneyType": "TestType", "HoneySize": 1}, headers={"Authorization" : f"Bearer {setup_token}"})
    client.delete('/honeytest', json={"HoneyType": "TestType2", "HoneySize": 2}, headers={"Authorization" : f"Bearer {setup_token}"})
    client.delete('/honeytest', json={"HoneyType": "NewTestType", "HoneySize": 5}, headers={"Authorization" : f"Bearer {setup_token}"})
    client.delete('/honeytest', json={"HoneyType": "SomeOtherTestType", "HoneySize": 10}, headers={"Authorization" : f"Bearer {setup_token}"})
    client.delete('/user', headers={"Authorization" : f"Bearer {setup_token}"})
    yield client
    client.post('/register', json={"username": "TestUser", "password": "TestPass"})
    rv = client.post('/login', json={"username": "TestUser", "password": "TestPass"})
    json = rv.get_json()
    setup_token = json["access_token"]
    client.delete('/honeytest', json={"HoneyType": "TestType", "HoneySize": 1}, headers={"Authorization" : f"Bearer {setup_token}"})
    client.delete('/honeytest', json={"HoneyType": "TestType2", "HoneySize": 2}, headers={"Authorization" : f"Bearer {setup_token}"})
    client.delete('/honeytest', json={"HoneyType": "NewTestType", "HoneySize": 5}, headers={"Authorization" : f"Bearer {setup_token}"})
    client.delete('/honeytest', json={"HoneyType": "SomeOtherTestType", "HoneySize": 10}, headers={"Authorization" : f"Bearer {setup_token}"})
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
                                    }
                    )
    json = rv.get_json()
    assert(rv.status_code == 401)

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

def test_put(client):
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

    rv = client.post('/createhoney', json={
                                    "HoneyType": "TestType2", 
                                    "HoneySize": 2,
                                    "Quantity": 2,
                                    "Price": 2000.00
                                    },
                    headers={"Authorization" : f"Bearer {token}"}
    )
    json = rv.get_json()

    rv = client.put('/createhoney', json={
                                    "HoneyType": "TestType",
                                    "HoneySize": 1,
                                    "Quantity": 100,
                                    "Price": 200.00,
                                    "NewHoneyType": "NewTestType",
                                    "NewHoneySize": 5
                                    }
    )
    assert(rv.status_code == 401)

    rv = client.put('/createhoney', json={
                                    "HoneyType": "TestType",
                                    "HoneySize": 1,
                                    "Quantity": 100,
                                    "Price": 200.00,
                                    "NewHoneyType": "TestType2",
                                    "NewHoneySize": 2
                                    },
                    headers={"Authorization" : f"Bearer {token}"}
    )
    json = rv.get_json()
    assert(rv.status_code == 404)
    assert(json["message"] == "An entry with a honey type of 'TestType2' and honey size of '2' already exists.")

    rv = client.put('/createhoney', json={
                                    "HoneyType": "TestType",
                                    "HoneySize": 1,
                                    "Quantity": 100,
                                    "Price": 200.00,
                                    "NewHoneyType": "NewTestType",
                                    "NewHoneySize": 5
                                    },
                    headers={"Authorization" : f"Bearer {token}"}
    )
    json = rv.get_json()
    assert(json["message"] == "Honey entry updated successfully.")

    rv = client.put('/createhoney', json={
                                    "HoneyType": "TestType2",
                                    "HoneySize": 2,
                                    "Quantity": 100,
                                    "Price": 200.00
                                    },
                    headers={"Authorization" : f"Bearer {token}"}
    )
    json = rv.get_json()
    assert(json["message"] == "Please provide NewHoneyType and NewHoneySize in body.")
    assert(rv.status_code == 400)

    rv = client.put('/createhoney', json={
                                    "HoneyType": "SomeOtherTestType",
                                    "HoneySize": 10,
                                    "Quantity": 100,
                                    "Price": 200.00,
                                    "NewHoneyType": "NewTestType",
                                    "NewHoneySize": 5
                                    },
                    headers={"Authorization" : f"Bearer {token}"}
    )
    json = rv.get_json()
    assert(json["message"] == "An entry with a honey type of 'SomeOtherTestType' and honey size of '10' doesn't exist and cannot be updated.")
    assert(rv.status_code == 404)

    rv = client.put('/createhoney', json={
                                    "HoneyType": "SomeOtherTestType",
                                    "HoneySize": 10,
                                    "Quantity": 100,
                                    "Price": 200.00
                                    },
                    headers={"Authorization" : f"Bearer {token}"}
    )
    json = rv.get_json()
    assert(rv.status_code == 201)
    assert(json["message"] == "Honey data created successfully.")