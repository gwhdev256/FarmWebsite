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
    client.delete('/haytest', json={"HayType": "test type", "BaleQuality": "Some Rain"}, headers={"Authorization" : f"Bearer {setup_token}"})
    client.delete('/haytest', json={"HayType": "test type 2", "BaleQuality": "Some Rain"}, headers={"Authorization" : f"Bearer {setup_token}"})
    client.delete('/haytest', json={"HayType": "new test type", "BaleQuality": "No Rain"}, headers={"Authorization" : f"Bearer {setup_token}"})
    client.delete('/haytest', json={"HayType": "newest test type", "BaleQuality": "Some Rain"}, headers={"Authorization" : f"Bearer {setup_token}"})
    client.delete('/user', headers={"Authorization" : f"Bearer {setup_token}"})
    yield client
    client.post('/register', json={"username": "TestUser", "password": "TestPass"})
    rv = client.post('/login', json={"username": "TestUser", "password": "TestPass"})
    json = rv.get_json()
    setup_token = json["access_token"]
    client.delete('/haytest', json={"HayType": "test type", "BaleQuality": "Some Rain"}, headers={"Authorization" : f"Bearer {setup_token}"})
    client.delete('/haytest', json={"HayType": "test type 2", "BaleQuality": "Some Rain"}, headers={"Authorization" : f"Bearer {setup_token}"})
    client.delete('/haytest', json={"HayType": "new test type", "BaleQuality": "No Rain"}, headers={"Authorization" : f"Bearer {setup_token}"})
    client.delete('/haytest', json={"HayType": "newest test type", "BaleQuality": "Some Rain"}, headers={"Authorization" : f"Bearer {setup_token}"})
    client.delete('/user', headers={"Authorization" : f"Bearer {setup_token}"})

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
                                    }
    )
    assert(rv.status_code == 401)

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
    assert("added_entry" in json)

    rv = client.post('/createhay', json={
                                    "HayType": "test type", 
                                    "BaleQuality": "Some Rain",
                                    "Quantity": 100,
                                    "Price": 200.00
                                    },
                    headers={"Authorization" : f"Bearer {token}"}
    )
    json = rv.get_json()
    assert(json["message"] == "Data for that hay type and quality already exists.")
    assert(rv.status_code == 404)
                    
def test_put(client):
    #http://localhost:5000/createhay
    client.post('/register', json={"username": "TestUser", "password": "TestPass"})
    rv = client.post('/login', json={"username": "TestUser", "password": "TestPass"})
    json = rv.get_json()
    token = json["access_token"]

    rv = client.post('/createhay', json={
                                    "HayType": "test type", 
                                    "BaleQuality": "Some Rain",
                                    "Quantity": 100,
                                    "Price": 200.00
                                    },
                    headers={"Authorization" : f"Bearer {token}"}
    )

    rv = client.post('/createhay', json={
                                    "HayType": "test type 2", 
                                    "BaleQuality": "Some Rain",
                                    "Quantity": 100,
                                    "Price": 200.00
                                    },
                    headers={"Authorization" : f"Bearer {token}"}
    )
    json = rv.get_json()

    rv = client.put('/createhay', json={
                                    "HayType": "test type",
                                    "BaleQuality": "Some Rain",
                                    "Quantity": 100,
                                    "Price": 200.00,
                                    "NewHayType": "new test type",
                                    "NewBaleQuality": "No Rain"
                                    }
    )
    assert(rv.status_code == 401)

    rv = client.put('/createhay', json={
                                    "HayType": "test type",
                                    "BaleQuality": "Some Rain",
                                    "Quantity": 100,
                                    "Price": 200.00,
                                    "NewHayType": "test type 2",
                                    "NewBaleQuality": "Some Rain"
                                    },
                    headers={"Authorization" : f"Bearer {token}"}
    )
    json = rv.get_json()
    assert(rv.status_code == 404)
    assert(json["message"] == "An entry with a hay type of 'test type 2' and bale quality of 'Some Rain' already exists.")

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

    rv = client.put('/createhay', json={
                                    "HayType": "test type 2",
                                    "BaleQuality": "Some Rain",
                                    "Quantity": 100,
                                    "Price": 200.00
                                    },
                    headers={"Authorization" : f"Bearer {token}"}
    )
    json = rv.get_json()
    assert(json["message"] == "Please provide NewHayType and NewBaleQuality in body.")
    assert(rv.status_code == 400)

    rv = client.put('/createhay', json={
                                    "HayType": "some other test type",
                                    "BaleQuality": "Some Rain",
                                    "Quantity": 100,
                                    "Price": 200.00,
                                    "NewHayType": "new test type",
                                    "NewBaleQuality": "No Rain"
                                    },
                    headers={"Authorization" : f"Bearer {token}"}
    )
    json = rv.get_json()
    assert(json["message"] == "An entry with a hay type of 'some other test type' and bale quality of 'Some Rain' doesn't exist and cannot be updated.")
    assert(rv.status_code == 404)

    rv = client.put('/createhay', json={
                                    "HayType": "newest test type",
                                    "BaleQuality": "Some Rain",
                                    "Quantity": 100,
                                    "Price": 200.00
                                    },
                    headers={"Authorization" : f"Bearer {token}"}
    )
    json = rv.get_json()
    assert(rv.status_code == 201)
    assert(json["message"] == "Hay data created successfully.")

def test_get_hay_data(client):
    #http://localhost:5000/hay/<_id>
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
    entry_id = json["added_entry"]["id"]

    rv = client.get(f'/hay/{entry_id}')
    json = rv.get_json()
    assert(rv.status_code == 200)
    assert(json["HayType"] == "test type")
    assert(json["BaleQuality"] == "Some Rain")

    rv = client.delete(f'/hay/{entry_id}', headers={"Authorization" : f"Bearer {token}"})

    rv = client.get(f'/hay/{entry_id}')
    json = rv.get_json()
    assert(rv.status_code == 404)
    assert(json["message"] == "Hay entry not found")

def test_delete(client):
    #http://localhost:5000/hay/<_id>
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
    entry_id = json["added_entry"]["id"]
    
    rv = client.delete(f'/hay/{entry_id}')
    assert(rv.status_code == 401)

    rv = client.delete(f'/hay/{entry_id}', headers={"Authorization" : f"Bearer {token}"})
    json = rv.get_json()
    assert(json["message"] == "Hay entry successfully deleted.")
    assert(rv.status_code == 200)

    rv = client.delete(f'/hay/{entry_id}', headers={"Authorization" : f"Bearer {token}"})
    json = rv.get_json()
    assert(json["message"] == "Hay entry not found")
    assert(rv.status_code == 404)

def test_get_hay_list(client):
    #http://localhost/haylist
    client.post('/register', json={"username": "TestUser", "password": "TestPass"})

    rv = client.post('/login', json={"username": "TestUser", "password": "TestPass"})
    json = rv.get_json()

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
    assert("added_entry" in json)

    entry_id = json["added_entry"]["id"]

    rv = client.get('/haylist')
    assert(rv.status_code == 200)

    # client.delete(f'/hay/{entry_id}', headers={"Authorization" : f"Bearer {token}"})