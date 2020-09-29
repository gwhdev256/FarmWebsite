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
    rv = client.post('/register', json={"username": "TestUser", "password": "TestPass"})
    rv = client.post('/login', json={"username": "TestUser", "password": "TestPass"})
    json = rv.get_json()
    setup_token = json["access_token"]
    rv = client.delete('/user', headers={"Authorization" : f"Bearer {setup_token}"})
    rv = client.post('/register', json={"username": "TestUser1", "password": "TestPass"})
    rv = client.post('/login', json={"username": "TestUser1", "password": "TestPass"})
    json = rv.get_json()
    setup_token2 = json["access_token"]
    rv = client.delete('/user', headers={"Authorization" : f"Bearer {setup_token2}"})
    yield client
 

def test_register(client):
    #http://localhost:5000/register
    rv = client.post('/register', json={"username": "TestUser1", "password": "TestPass"})
    json = rv.get_json()
    assert(json["message"] == "User 'TestUser1' created successfully.")
    assert(rv.status_code == 201)

    rv = client.post('/register', json={"username": "TestUser1", "password": "TestPass"})
    json = rv.get_json()
    assert(json["message"] == "A user with that username already exists.")
    assert(rv.status_code == 404)
    

def test_login(client):
    #http://localhost:5000/login
    rv = client.post('/register', json={"username": "TestUser", "password": "TestPass"})

    rv = client.post('/login', json={"username": "TestUser", "password": "TestPass"})
    json = rv.get_json()
    assert("access_token" in json)
    assert(rv.status_code == 200)

    setup_token = json["access_token"]

    rv = client.post('/login', json={"username": "WrongTestUser", "password": "TestPass"})
    json = rv.get_json()
    assert(rv.status_code == 401)

    rv = client.post('/login', json={"username": "TestUser", "password": "WrongTestPass68JwIotpIXNa"})
    json = rv.get_json()
    assert(rv.status_code == 401)


def test_delete(client):
    rv = client.post('/register', json={"username": "TestUser", "password": "TestPass"})
    rv = client.post('/login', json={"username": "TestUser", "password": "TestPass"})
    json = rv.get_json()    
    token = json["access_token"]

    rv = client.delete('/user')
    assert(rv.status_code == 401)

    rv = client.delete('/user', headers={"Authorization" : f"Bearer {token}"})
    json = rv.get_json()
    assert(json['message'] == "User deleted successfully.")
    assert(rv.status_code == 200)


def test_get(client):
    rv = client.post('/register', json={"username": "TestUser1", "password": "TestPass"})
    rv = client.post('/login', json={"username": "TestUser1", "password": "TestPass"})
    json = rv.get_json()    
    token = json["access_token"]

    rv = client.get('/user', json={"username": "TestUser1", "password": "TestPass"})
    assert(rv.status_code == 401)
    
    rv = client.get('/user', headers={"Authorization" : f"Bearer {token}"})
    json = rv.get_json()
    assert(json['username'] == 'TestUser1')
    assert(rv.status_code == 200)

    rv = client.delete('/user', headers={"Authorization" : f"Bearer {token}"})
    
    rv = client.get('/user', headers={"Authorization" : f"Bearer {token}"})
    assert(rv.status_code == 404)